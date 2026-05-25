/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization — allow external avatar domains
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },

  // Workaround: Next.js 15 cannot serialize FlatCompat parser functions during build.
  // ESLint still runs via `npm run lint`. See: github.com/vercel/next.js/issues/64409
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Ensure native PDF and canvas dependencies are treated as external server packages
  serverExternalPackages: ["pdf-parse", "@napi-rs/canvas"],

  // Silence TypeScript errors that are non-critical during build
  typescript: {
    ignoreBuildErrors: false,
  },

  // Security headers for production
  async headers() {
    const isProduction =
      process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
      process.env.VERCEL_ENV === "production" ||
      process.env.NODE_ENV === "production";

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },

  // Enable compression
  compress: true,

  // Logging in production
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;
