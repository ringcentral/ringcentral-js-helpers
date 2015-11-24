var webpack = require('webpack'),
    path = require('path'),
    glob = require('glob'),
    libExternals = {
    },
    testExternals = {
        'ringcentral': getExternal('RingCentral', 'ringcentral'),
        '../SDK': getExternal('SDK', '../ringcentral-helpers'),
        'soap': getExternal('soap'),
        'chai': getExternal('chai'),
        'sinon': getExternal('sinon'),
        'sinon-chai': getExternal('sinonChai', 'sinon-chai'),
        'mocha': getExternal('mocha')
    };

function getExternal(root, cjs, amd) {
    if (!cjs) cjs = root;
    return {
        amd: amd || cjs,
        commonjs: cjs,
        commonjs2: cjs,
        root: root
    };
}

function createConfig(config) {

    return {

        debug: true,
        devtool: '#source-map',

        externals: config.externals,
        entry: config.entry,

        output: {
            filename: './build/[name]',
            libraryTarget: 'umd',
            library: ['RingCentral', 'Helpers'],
            sourcePrefix: ''
        },

        resolve: {
            extensions: ['', '.ts', '.js', '.json']
        },

        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader'
                }
            ]
        },

        node: {
            buffer: false
        },

        plugins: [],

        watchDelay: 200

    };

}

module.exports = [
    createConfig({
        entry: {
            'ringcentral-helpers.js': ['./src/SDK.ts'],
            'tests/specs.js': glob
                .sync('src/**/*-spec.ts')
                .sort(function(a, b) { return b.localeCompare(a); })
                .concat('src/test/mocha.ts') // this one will be exported
                .map(function(f) {
                    return './' + f;
                })
        },
        externals: (function() {

            var externals = {};

            Object.keys(libExternals).forEach(function(key) {
                externals[key] = libExternals[key];
            });

            Object.keys(testExternals).forEach(function(key) {
                externals[key] = testExternals[key];
            });

            return externals;

        })()
    })
];

//console.log('Webpack Config');
//console.log(JSON.stringify(module.exports, null, 2));
