import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  experimental: {
    optimizePackageImports: [
      "@react-three/drei",
      "@react-three/fiber",
      "@react-three/postprocessing",
      "framer-motion",
      "three",
    ],
  },
};

export default nextConfig;
