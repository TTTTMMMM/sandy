/* var webpack = require("webpack"); */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var path = require("path");
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
   entry: {
      index: SRC_DIR + "/app/index.js",
      gallery: SRC_DIR + "/app/gallery.js",
      faq: SRC_DIR + "/app/faq.js",
      gMaps: SRC_DIR + "/app/gMaps.js",
      sales: SRC_DIR + "/app/sales.js"
   },
   module: {
      rules: [
         {
            test: /\.js?/,
            include: SRC_DIR,
            loader: "babel-loader",
            query: {
               presets: ["@babel/react"]
            }
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
         },
         {
            // Load all images as base64 encoding if they are smaller than 8192 bytes
            test: /\.(png|jpg|gif|svg|jpeg)$/,
            use: [
               {
                  loader: "url-loader",
                  options: {
                     // On development we want to see where the file is coming from, hence we preserve the [path]
                     name: "[path][name].[ext]?hash=[hash:20]",
                     limit: 8192
                  }
               }
            ]
         }
      ]
   },
   plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: SRC_DIR + "/index.html",
         inject: true,
         chunks: ["index"],
         filename: "index.html"
      }),
      new HtmlWebpackPlugin({
         template: SRC_DIR + "/gallery.html",
         inject: true,
         chunks: ["gallery"],
         filename: "gallery.html"
      }),
      new HtmlWebpackPlugin({
         template: SRC_DIR + "/faq.html",
         inject: true,
         chunks: ["faq"],
         filename: "faq.html"
      }),
      new HtmlWebpackPlugin({
         template: SRC_DIR + "/gMaps.html",
         inject: true,
         chunks: ["gMaps"],
         filename: "gMaps.html"
      }),
      new HtmlWebpackPlugin({
         template: SRC_DIR + "/sales.html",
         inject: true,
         chunks: ["sales"],
         filename: "sales.html"
      })
   ]
};

module.exports = config;
