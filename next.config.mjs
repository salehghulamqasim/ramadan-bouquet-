
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
  async headers() {
    return [
      {
        source: '/(.*).(png|jpg|jpeg|gif|webp|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};


export default nextConfig;
