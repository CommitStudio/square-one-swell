/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.schema.io', 'cdn-staging.swell.store']
  }
};

module.exports = nextConfig;
