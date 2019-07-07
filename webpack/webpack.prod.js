const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const release = process.env.RELEASE || 'unversioned';

module.exports = merge(common, {
    mode: 'production',

    devtool: 'source-map',

    plugins: [
        new SentryWebpackPlugin({
            include: 'dist',
            release,
        }),
    ],

    output: {
        filename: chunkData =>
            chunkData.chunk.name === 'contentFinder' ? '[name].js' : '[name].[chunkhash:8].js',
    },
});
