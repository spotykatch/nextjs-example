/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      path: false,
      "react-native-sqlite-storage": false,
      "aws-sdk": false
    };
    config.plugins = [
      ...config.plugins,
      new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
        result.request = result.request.replace(/typeorm/, "typeorm/browser");
      }),
      new webpack.ProvidePlugin({
        "window.SQL": "sql.js/dist/sql-wasm.js",
      }),
    ];
    return config;
  },
};

module.exports = nextConfig;
