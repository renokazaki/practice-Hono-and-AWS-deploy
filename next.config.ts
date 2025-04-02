/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  // // API リクエストのリライトルール
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "/server/api/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
