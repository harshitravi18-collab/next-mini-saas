/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // This creates a static 'out' folder when you build
  images: {
    unoptimized: true,
  },

  basePath: "/next-mini-saas",
};

export default nextConfig;
