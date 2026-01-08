export interface IMeme {
  id: string;
  name: string;
  imageUrl: string;
}

export interface IImgflipMeme {
  name: string;
  url: string;
}

export interface IImgflipResponse {
  success: boolean;
  data: {
    memes: IImgflipMeme[];
  };
}
