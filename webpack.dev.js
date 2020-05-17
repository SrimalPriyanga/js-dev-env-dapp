import path from "path";
import merge from "webpack-merge";
// eslint-disable-next-line import/default
import webpackCommon from "./webpack.common";

module.exports = merge(webpackCommon, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "src"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader", // injects style into DOM
          "css-loader", // turns CSS into JS
          {
            loader: "sass-loader", // turns SCSS into CSS
            options: {
              implementation: require("sass"), // Select `dart-sass > sass` or `node-sass > node-sass`
            },
          },
        ],
      },
    ],
  },
  devServer: {
    noInfo: true, // only errors & warns on hot reload
  },
});
