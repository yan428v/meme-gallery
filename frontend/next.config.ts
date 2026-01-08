import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgflip.com',
      },
    ],
  },
  // Allow access from other devices in local network during development
  allowedDevOrigins: ['*'],
};

export default nextConfig;
