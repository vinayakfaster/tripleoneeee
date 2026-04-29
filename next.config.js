/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
  },
};

// next.config.js
module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "ui-avatars.com",        // Avatar ke liye
      "lh3.googleusercontent.com", // Google login avatar
    ],
  },
};