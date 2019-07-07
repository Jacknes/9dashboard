const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',

    devtool: 'eval-cheap-module-source-map',

    plugins: [new webpack.HotModuleReplacementPlugin()],

    devServer: {
        overlay: {
            errors: true,
            warnings: true,
        },
        hot: true,
        historyApiFallback: true,
    },
});
