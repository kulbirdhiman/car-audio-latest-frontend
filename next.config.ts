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
  async redirects() {
    return [
      {
        source: "/uncategorized/:path*",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/add-to-cart/:path*",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/page/:path*",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
