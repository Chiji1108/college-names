/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "i.pravatar.cc",
      },
      {
        hostname: "ddxagjposirivghwfhoo.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
