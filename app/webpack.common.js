const path = require('path')
const webpack = require('webpack')

module.exports = options => ({
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
        {
            // Compile into js/build.js
            path: path.resolve(process.cwd(), 'build'),
            publicPath: '/',
        },
        options.output,
    ),
    optimization: options.optimization,
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-react', 'stage-2']
                    }
                }
            },
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'sass-loader']
            //     })
            // }
            {
                // Preprocess 3rd party .css files located in node_modules
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ]
    },
    plugins: options.plugins.concat([
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ]),
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js'],
    },
    devServer: options.devServer
})