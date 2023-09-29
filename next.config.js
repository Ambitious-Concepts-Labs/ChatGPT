/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "links.papareact.com",
      "www.google.com",
      "www.shareicon.net",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {
    appDir: true,
  },
};
