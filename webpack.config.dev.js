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
    })
  ],
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
      { test: /\.js$/, exclude: /node_modules/, loader: ["babel-loader"] },
    ],
  },
  devServer: {
    noInfo: true, // only errors & warns on hot reload
  },
};
