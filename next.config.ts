import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    qualities: [70, 75],
  },
};

export default nextConfig;
