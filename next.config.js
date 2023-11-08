/** @type {import('next').NextConfig} */
const nextConfig = {
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
