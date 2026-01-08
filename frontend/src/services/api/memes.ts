import { apiClient } from './client';
import { GetMemesResponse } from '@/types/api';
import { Meme } from '@/types/meme';

export interface GetMemesParams {
  limit?: number;
  cursor?: string;
}

export async function getMemes(
  params: GetMemesParams = {},
  signal?: AbortSignal
): Promise<GetMemesResponse> {
  return apiClient.get<GetMemesResponse>('/memes', {
    params: {
      limit: params.limit,
      cursor: params.cursor,
    },
    signal,
  });
}

export async function updateMeme(
  id: string,
  data: { name: string }
): Promise<Meme> {
  return apiClient.patch<Meme>(`/memes/${id}`, data);
}
