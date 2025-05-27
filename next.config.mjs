/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zngdovnbkulfejgkkqvp.supabase.co",
      },
      {
        protocol: "https",
        hostname: "rtjsuqyiomhphivrwmrd.supabase.co",
      },
    ],
  },
};

export default nextConfig;
