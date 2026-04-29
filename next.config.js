/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "ui-avatars.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;