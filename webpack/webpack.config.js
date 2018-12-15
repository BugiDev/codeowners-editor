const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const aliasConfig = require('./webpack.alias');

module.exports = merge(aliasConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './src/ui/index.tsx',
    output: {
        path: path.join(__dirname, '/dist/ui'),
        filename: 'index_bundle.js',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    devServer: {
        host: '127.0.0.1',
        contentBase: path.join(__dirname, 'ui'),
        compress: true,
        port: 9000,
        https: true,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    module: {
        rules: [// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            hash: true,
            filename: 'index.html', // target html
            template: './src/ui/index.html', // source html
        }),
    ],
});
