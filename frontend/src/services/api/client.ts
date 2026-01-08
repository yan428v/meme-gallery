import { ApiError } from '@/types/api';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

class ApiClient {
  private getBaseUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error(
        'NEXT_PUBLIC_API_URL environment variable is not defined. ' +
        'Please set it in your .env file.'
      );
    }

    return apiUrl;
  }

  private buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
    const url = new URL(`${this.getBaseUrl()}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let error: ApiError;

      try {
        error = await response.json();
      } catch {
        error = {
          statusCode: response.status,
          message: response.statusText || 'An error occurred',
          error: 'Error',
        };
      }

      throw new Error(
        Array.isArray(error.message)
          ? error.message.join(', ')
          : error.message
      );
    }

    return response.json();
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);

    const response = await fetch(url, {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(path, options?.params);

    const response = await fetch(url, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();
