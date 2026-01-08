export interface Configuration {
  port: number;
  nodeEnv: string;
  mongodb: {
    uri: string;
  };
  cors: {
    origin: string | boolean;
  };
  imgflip: {
    apiUrl: string;
  };
}

export default (): Configuration => {
  const mongodbUri = process.env.MONGODB_URI;
  const corsOrigin = process.env.CORS_ORIGIN;
  const imgflipApiUrl = process.env.IMGFLIP_API_URL;

  if (!mongodbUri) {
    throw new Error('MONGODB_URI environment variable is required');
  }

  if (!corsOrigin) {
    throw new Error('CORS_ORIGIN environment variable is required');
  }

  if (!imgflipApiUrl) {
    throw new Error('IMGFLIP_API_URL environment variable is required');
  }

  const nodeEnv = process.env.NODE_ENV || 'development';
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

  return {
    port,
    nodeEnv,
    mongodb: {
      uri: mongodbUri,
    },
    cors: {
      origin: corsOrigin,
    },
    imgflip: {
      apiUrl: imgflipApiUrl,
    },
  };
};
