import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // GitHub Actions ships the minimal self-contained Node.js runtime produced
  // here instead of installing dependencies on the production server.
  output: "standalone",
  // React's development-only double mount can dispose the active WebGL
  // renderer before React Three Fiber finishes restoring the scene.
  reactStrictMode: false,
};

export default nextConfig;
