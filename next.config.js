/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config ...
  experimental: {
    // Remove serverActions
  },
  // Remove optimizeCss since it's causing issues with critters
  images: {
    domains: ['your-domain.com'], // Add your image domains if needed
  },
  // Add proper error handling through custom webpack config
  webpack: (config, { isServer }) => {
    // Optimize chunks and reduce size
    config.optimization = {
      ...config.optimization,
      mergeDuplicateChunks: true,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    }

    // Ignore punycode warning
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ },
    ]

    return config
  },
  // Increase build timeout if needed
  staticPageGenerationTimeout: 180,
  // Optimize production build
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
}

module.exports = nextConfig 