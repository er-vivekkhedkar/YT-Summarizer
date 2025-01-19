/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config ...
  experimental: {
    // Remove serverActions
    turbo: {
      rules: {
        // Your Turbopack configuration here if needed
      },
    },
  },
  // Remove optimizeCss since it's causing issues with critters
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
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