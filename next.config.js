/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
    domains: ['console.firebase.google.com', 'другие-разрешенные-хосты.com'],
  },
};

module.exports = nextConfig;
