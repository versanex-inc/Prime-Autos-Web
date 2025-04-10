/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['unsplash.it', 'imgur.com', 'i.imgur.com', 'res.cloudinary.com'], // Added 'i.imgur.com'
  },
  eslint: {
    // Ignore specific rules during builds
    ignoreDuringBuilds: true, // Disables all ESLint checks during build (use with caution)
    // OR selectively disable the rule:
    // dirs: ['src'], // Specify directories to lint
  },
};

module.exports = nextConfig;