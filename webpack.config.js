const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: "inline-source-map",
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        contentBase: './dist',
        hot: false,
        https: false,
        hotOnly: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'index.html'
    })],
    output: {
        filename: '[name].bundle.js',
        publicPath: "http://localhost:8080/",
        path: path.resolve(__dirname, 'dist'),
    },
};
