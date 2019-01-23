const path = require('path');

module.exports = {
    target: 'node',
    devtool: 'source-map',
    stats: { warnings: false },
    entry: {
        server: './server/server.ts',
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
    node:{
        __dirname: false
    }
};