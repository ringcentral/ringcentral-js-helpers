var webpack = require('webpack'),
    path = require('path'),
    glob = require('glob'),
    libExternals = {
        'ringcentral': getExternal('RingCentral', 'ringcentral')
    },
    testExternals = {
        '../lib/SDK': getExternal('SDK', '../ringcentral-helpers'),
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
            libraryTarget: 'umd', //TODO RCSDK.noConflict()
            library: 'RCSDK',
            sourcePrefix: ''
        },

        resolve: {
            extensions: ['', '.ts', '.js', '.json'],
            alias: {
                'es6-promise': path.resolve('./bower_components/es6-promise-polyfill/promise.js'),
                'pubnub': path.resolve('./bower_components/pubnub/web/pubnub.js') // smaller size than NPM version
            }
        },

        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader?sourceMap&target=ES5' //TODO Use typescript-loader and tsconfig.json
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
            'ringcentral-helpers.js': ['./src/lib/SDK.ts'],
            'tests/specs.js': glob
                .sync('src/lib/**/*-spec.ts')
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
