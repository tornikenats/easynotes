const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const apiMocker = require('webpack-api-mocker');

const plugins = [
    new HtmlWebpackPlugin({
        inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
        template: 'app/index.html',
    }),
    new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false, // show a warning when there is a circular dependency
    }),
];


module.exports = require('./webpack.common')({
    mode: 'development',

    entry: {
        app: path.join(process.cwd(), 'app/index.js'),
    },

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    optimization: {
        minimize: false,
    },

    plugins: plugins, // eslint-disable-line no-use-before-define

    // Emit a source map for easier debugging
    // See https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'eval-source-map',

    performance: {
        hints: false,
    },
    devServer: {
        historyApiFallback: true,
        before(app) {
            apiMocker(app, path.resolve('./mocker/index.js'), {
                proxy: {
                    '/repos/*': 'https://api.github.com/',
                },
                changeHost: true,
            })
        }
    },
})