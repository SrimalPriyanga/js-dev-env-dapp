import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
  devtool: "inline-source-map",
  entry: [path.resolve(__dirname, "src/index")],
  target: "web",
  output: {
    path: path.resolve(__dirname, "src"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
    ],
  },
  devServer: {
    noInfo: true, // only errors & warns on hot reload
  },
};
