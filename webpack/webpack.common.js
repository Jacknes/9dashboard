const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const release = process.env.RELEASE || 'unversioned';

module.exports = {
    entry: {
        bundle: './src/index',
        contentFinder: './content-finder',
    },

    output: {
        filename: '[name].js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/,
                loader: 'babel-loader',
                options: {
                    // This is a feature of `babel-loader` for Webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new webpack.DefinePlugin({
            RELEASE: `'${release}'`,
        }),
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            src: path.resolve(__dirname, '../src'),
        },
    },
};
