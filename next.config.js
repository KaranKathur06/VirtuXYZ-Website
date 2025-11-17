/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Dynamic mode - API routes and server-side rendering enabled
  // Disable static optimization for pages that use client-side hooks
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
