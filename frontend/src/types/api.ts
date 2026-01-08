import { Meme } from './meme';

export interface GetMemesResponse {
  data: Meme[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}
