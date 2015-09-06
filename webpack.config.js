var webpack = require('webpack');
var path = require('path');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        app: [path.resolve(__dirname, 'modules/app.jsx')],
        sign: [path.resolve(__dirname, 'modules/sign.jsx')]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: './public/',
        filename: '[name].js'
    },
    plugins: [commonsPlugin],
    resolve: {
        root: [
            path.resolve('./lib/'),
            path.resolve('./modules/')
        ],
        extensions: [
            '',
            '.js',
            '.jsx'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['jsx?harmony']
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,

                // inline base64 URLs for <=8k images, direct URLs for the rest
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};