const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const buildPath = path.resolve(__dirname, 'dist/build');
const isMinifyMode = process.env.BUILD_MODE.trim() === 'minify'

module.exports = {
    entry: {
        'designers': './src/designers.js'
    },
    mode: 'production',
    output: {
        filename: isMinifyMode ? 'js/[name].min.js' : 'js/[name].js',
        path: buildPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            }, {
                test: /\.(scss|css|sass)$/,
                use: [ {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: isMinifyMode ? 'compressed' : 'expanded',
                            },
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isMinifyMode ? 'css/[name].min.css' : 'css/[name].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                map: {
                    inline: false,
                },
                discardComments: {
                    removeAll: true
                },
                discardUnused: false
            },
            canPrint: true
        }),
        new webpack.BannerPlugin({banner: require('./tools/banner')}),
        new CleanWebpackPlugin(),
    ]
}
