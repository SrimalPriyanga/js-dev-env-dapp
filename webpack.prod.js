import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import merge from "webpack-merge";
// eslint-disable-next-line import/default
import webpackCommon from "./webpack.common";

module.exports = merge(webpackCommon, {
  devtool: "source-map",
  // entry: {
  //   vendor: path.resolve(__dirname, "src/vendor"),
  //   main: path.resolve(__dirname, "src/index"),
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash].js",
  },
  plugins: [
    // Generate an external css file with a hash in the filename
    // new ExtractTextPlugin("[name].[contenthash].css"),
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),
    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    // }),
    // Eliminate duplicate packages when generate bundle
    // new webpack.optimize.DedupePlugin(),
    // Minify JS
    // new webpack.optimize.UglifyJsPlugin(),
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      // TODO: add track js token to configure error login
      trackJSToken: "",
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./dist",
            },
          },
          "css-loader",
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
  optimization: {
    minimize: true,
  },
});

// TODO: CSS minify and separate bundling
