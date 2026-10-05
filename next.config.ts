import type { NextConfig } from "next";

const longCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/models/:path*", headers: longCache },
      { source: "/draco/:path*", headers: longCache },
      { source: "/images/hero-poster.webp", headers: longCache },
      { source: "/images/hero-poster-m.webp", headers: longCache },
    ];
  },
};

export default nextConfig;
