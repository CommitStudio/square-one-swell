/** @type {import('next').NextConfig} */

/*****************************************************************************
 * Custom Next.js configuration
 ****************************************************************************/
const customEnvs = {};

if (process.env.DEFAULT_STORE === 'swell') {
  customEnvs.PUBLIC_STORE_URL = `https://${String(process.env.SWELL_STORE_ID)}.swell.store`;
  customEnvs.PUBLIC_SWELL_STORE_ID = process.env.SWELL_STORE_ID;
  customEnvs.PUBLIC_SWELL_PUBLIC_KEY = process.env.SWELL_PUBLIC_KEY;
}

/*****************************************************************************
 * Next.js Configuration
 ****************************************************************************/
const nextConfig = {
  env: {
    ...customEnvs
  },
  reactStrictMode: true,
  images: {
    domains: ['cdn.schema.io', 'cdn-staging.swell.store']
  }
};

module.exports = nextConfig;
