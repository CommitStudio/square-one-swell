/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['http://cdn.schema.io', 'http://cdn-staging.swell.store']
  }
};

module.exports = nextConfig;
