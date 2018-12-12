const path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  console.log('Building client for: ' + argv.mode);

  return {
    entry: {
      index: './client/index.tsx',
    },
    optimization: {
      splitChunks: {
        name: 'vendor',
        // include all types of chunks
        chunks: 'all',
      },
      minimizer: argv.mode === 'production' ? [new UglifyJsPlugin()] : []
    },
    plugins: [
      new webpack.AutomaticPrefetchPlugin(),
      new MiniCssExtractPlugin({
        filename: argv.mode === 'production' ? '[name].[hash].css' : '[name].css',
      }),
      new BundleAnalyzerPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },
        { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] }, // compiles Less to CSS 
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: argv.mode === 'production' ? '[name].[hash].js' : '[name].js',
      path: path.resolve(__dirname, './public/dist')
    },
  };
};