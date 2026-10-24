import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
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
