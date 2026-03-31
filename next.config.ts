import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jsonplaceholder.typicode.com",
      },
    ],
  },
};

export default nextConfig;
