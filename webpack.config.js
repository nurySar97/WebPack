const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDev = process.env.NODE_ENV === 'development';
console.log(isDev)

module.exports = {
    context: path.resolve(__dirname, 'src'),
    // Entry files
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    // mode can be dev or prod
    mode: "development",
    // here you can set output files name for example hash, id ...etc
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    // here you can show file extension an the you can import not showing file extension
    resolve: {
        extensions: ['.js', '.json', '.xml', '.png', '.csv', '.css'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    // this optimization won't let to boiler plate for example double time use jquery in analytics.js an main.js
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        port: 4200
    },
    // Plugins Clean and HTML
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
        })
    ],
    // Here you can show webpack loaders
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            }
                        },
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
};