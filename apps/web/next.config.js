const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
});
