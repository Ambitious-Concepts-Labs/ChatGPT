/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
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
