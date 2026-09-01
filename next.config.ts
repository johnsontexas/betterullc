import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // BetterU Social Fitness has its own site — that's where it lives.
      {
        source: "/betteru",
        destination: "https://betteruai.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
