import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output:"standalone",
  /* config options here */
  experimental: {
    turbopackFileSystemCacheForDev:true,
  },
};

export default nextConfig;
