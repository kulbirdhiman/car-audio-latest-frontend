/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kayhanaudio.com.au",
      },
      {
        protocol: "https",
        hostname: "d198m4c88a0fux.cloudfront.net",
      },
    ],
  },
};

module.exports = nextConfig;
