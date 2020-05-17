import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
  mode: "production",
  entry: [path.resolve(__dirname, "src/index")],
  target: "web",
  plugins: [
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: ["babel-loader"] },
    ],
  },
  // optimization
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        // vendor chunk
        vendor: {
          // name of the chunk
          name: "vendor",

          // async + async chunks
          chunks: "all",

          // import file path containing node_modules
          test: /node_modules/,

          // priority
          priority: 20,
        },

        // common chunk
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
};
