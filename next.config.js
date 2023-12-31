/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        destination: "/dashboard",
        source: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
