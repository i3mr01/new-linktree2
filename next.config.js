/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  output: 'standalone',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Disable static optimization for pages that need runtime environment variables
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;

