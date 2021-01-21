const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },

    mode: "development",

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js', '.json', '.xml', '.png', '.csv', '.css' ],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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