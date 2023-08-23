/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "http://localhost:8080/socket.io/:path*",
      },
    ];
  },
};
