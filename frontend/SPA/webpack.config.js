const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', 
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    entry: {
        App: './src/index.js',
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        extensions: ['.jsx', '.js']
    },
    plugins: [
        // Add the script tag of loader to the HTML
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: './src/index.html'
        })
    ],
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // string
        filename: '[name].js'

    }
}