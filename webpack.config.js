/* var webpack = require("webpack"); */
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: {
        index: SRC_DIR + "/app/index.js", 
        gallery: SRC_DIR + "/app/gallery.js"
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
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: SRC_DIR + '/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: SRC_DIR + '/gallery.html',
            inject: true,
            chunks: ['gallery'],
            filename: 'gallery.html'
        }),
    ]
};

module.exports = config;