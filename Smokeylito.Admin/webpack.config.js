const path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  console.log('Building client for: ' + argv.mode);

  const clientConfig =  {
    devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
    entry: {
      index: './client/index.tsx',
    },
    optimization: {
      splitChunks: {
        name: 'vendor',
        // include all types of chunks
        chunks: 'all',
      },
    },
    plugins: [
      new webpack.AutomaticPrefetchPlugin(),
      new MiniCssExtractPlugin({
        filename: argv.mode === 'production' ? '[name].[hash].css' : '[name].css',
      }),
      new HtmlWebpackPlugin({  // Also generate a test.html
        filename: '../index.html',
        template: './public/index.html'
      })
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

  if(env && env.analyze){
    clientConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  if(argv.mode === 'production'){
    clientConfig.plugins.push(new UglifyJsPlugin({
      sourceMap: true
    }));
  }

  return clientConfig;
};