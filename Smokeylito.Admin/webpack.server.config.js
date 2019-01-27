const webpack = require('webpack');
const path = require('path');

module.exports = {
    target: 'node',
    devtool: 'source-map',
    stats: { warnings: false },
    entry: {
        server: [ 'webpack/hot/poll?1000', './server/server.ts' ],
    },
    module: {
        rules: [
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: 'ts-loader'
        },
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    node:{
        __dirname: false
    }
};