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
    appDir: true,
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
    // Handle specific module errors
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }

    // Ignore specific warnings
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ },
      { module: /node_modules\/ytdl-core/ },
      { module: /node_modules\/youtube-transcript/ },
    ];

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

    return config
  },
  // Increase build timeout if needed
  staticPageGenerationTimeout: 180,
  // Optimize production build
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  // API and CORS configuration
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  // Environment configuration
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // Increase timeouts for API calls
  serverTimeout: 60000,
}

module.exports = nextConfig 