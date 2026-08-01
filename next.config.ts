import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // React's development-only double mount can dispose the active WebGL
  // renderer before React Three Fiber finishes restoring the scene.
  reactStrictMode: false,
};

export default nextConfig;
