/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['unsplash.it', 'imgur.com', 'i.imgur.com', 'res.cloudinary.com'], // Added 'i.imgur.com'
  },
};

module.exports = nextConfig;