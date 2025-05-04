import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/therapynoteapp' : '',
  images: {
    unoptimized: true,
  },
  // This is optional but helpful if you have any TS errors that would block the build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;