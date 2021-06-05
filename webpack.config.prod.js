const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.[hash].js",
    assetModuleFilename: "img/[name].[hash].[ext]",
  },
  devtool: "source-map",
  plugins: [new CleanWebpackPlugin()],
});
