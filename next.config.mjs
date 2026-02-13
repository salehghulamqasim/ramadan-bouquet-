
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ignoreDuringBuilds: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    // Optimized images for Vercel
  },
  experimental: {
    webpackBuildWorker: true,
  },
};


export default nextConfig;
