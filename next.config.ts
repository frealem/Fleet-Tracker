import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:"standalone",
  /* config options here */
  experimental: {
    turbopackFileSystemCacheForDev:true,
  },
  devIndicators:false,
};

export default nextConfig;
