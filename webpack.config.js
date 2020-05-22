const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let module = {
    watch: false,
    mode: 'development',
    entry: './src/designers.js',
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {loader: 'css-loader', options: {importLoaders: 1}},
                'postcss-loader',
                'sass-loader',
            ],
        },]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/designers.css"
        }),
    ],
}


module.exports = config