import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/stats/:path*",
        destination: "https://umami.prompter.uz/:path*",
      },
    ];
  },
};

export default nextConfig;
