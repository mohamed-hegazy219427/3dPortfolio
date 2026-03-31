import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  // Target modern browsers — eliminates legacy JS polyfills (~11 KiB savings)
  experimental: {
    browsersListForSwc: true,
  },
};

export default nextConfig;
