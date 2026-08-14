import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        // GitHub repo Open Graph social images (project cards):
      //   https://github.com/Josua-dev/<repo>.png  (309 -> opengraph.githubassets.com)
        protocol: "https",
        hostname: "github.com",
        pathname: "/Josua-dev/*.png",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
  },
};

export default nextConfig;