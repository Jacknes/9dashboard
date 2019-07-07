module.exports = api => {
    const env = api.env();
    const isTest = api.cache(() => env === 'test');

    const presets = [
        [
            '@babel/env',
            {
                targets: isTest
                    ? { node: 'current' }
                    : {
                          browsers: [
                              'last 1 chrome versions',
                              'last 1 safari versions',
                              'last 1 edge versions',
                              'last 1 firefox versions',
                          ],
                      },
                modules: isTest ? 'commonjs' : false,
            },
        ],
        '@babel/react',
        '@babel/typescript',
    ];

    const plugins = [
        'react-hot-loader/babel',
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-styled-components',
        'babel-plugin-lodash',
    ];

    return {
        presets,
        plugins,
    };
};
