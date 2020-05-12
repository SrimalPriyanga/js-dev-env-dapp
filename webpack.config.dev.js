import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = {
  mode: "development",
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "./dist",
              hmr: process.env.NODE_ENV === "development",
            },
          },
          "style-loader", // injects style into DOM
          "css-loader", // turns CSS into JS
          "sass-loader", // turns SCSS into CSS
        ],
      },
      { test: /\.js$/, exclude: /node_modules/, loader: ["babel-loader"] },
    ],
  },
  devServer: {
    noInfo: true, // only errors & warns on hot reload
  },
};
