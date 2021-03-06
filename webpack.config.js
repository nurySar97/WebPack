const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (text, loader) => {
    return ({
        test: text,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: (resourcePath, context) => {
                        return path.relative(path.dirname(resourcePath), context) + '/';
                    }
                },
            },
            'css-loader',
            ...(!loader ? [] : [loader])
        ]
    })
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }

    return config
}
// Here

module.exports = {
    context: path.resolve(__dirname, 'src'),
    // Entry files
    entry: {
        main: ['@babel/polyfill','./index.js'],
        analytics: './analytics.js'
    },
    // mode can be dev or prod
    mode: "development",
    // here you can set output files name for example hash, id ...etc
    output: {
        filename: filename('js'),
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
    optimization: optimization(),
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
            filename: filename('css'),
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin(),
        new TerserPlugin()
    ],
    // Here you can show webpack loaders
    module: {
        rules: [
            cssLoaders(/\.css$/),
            cssLoaders(/\.less$/, 'less-loader'),
            cssLoaders(/\.s[ac]ss$/, 'sass-loader'),
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
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                  }
                }
              }
        ]
    }
};