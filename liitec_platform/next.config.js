/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "",
  //       port: "",
  //       pathname: "",
  //     },
  //   ],
  // },
  env: {
    BASE_URL: process.env.NEXT_APP_API_URL,
  }
};

module.exports = nextConfig;
