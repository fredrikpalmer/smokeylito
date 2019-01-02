const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlAssetNameReplacerPlugin = require('./utilities/html-assetname-replacer-plugin');

module.exports = (env, argv) => {
  console.log('Building server & client for: ' + argv.mode);

  const serverConfig =  {
    target: 'node',
    devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
    entry: {
      server: './server/server.ts',
    },
    // plugins: [

    // ],
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
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },
        { 
          test: /\.less$/, 
          use: [
            argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 
            'css-loader', 
            'less-loader'
          ] 
        },
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: argv.mode === 'production' ? '[name].[hash].js' : '[name].js',
      path: path.resolve(__dirname, './public/dist'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: argv.mode === 'production' ? '[name].[hash].css' : '[name].css',
      }),
      new HtmlAssetNameReplacerPlugin({
        hot: argv.hot
      }),
    ],
  };

  if(env && env.analyze){
    clientConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  if(!argv.hot){
    clientConfig.plugins.push(new CleanWebpackPlugin(['./public/dist']));
  }

  if(argv.mode === 'production'){
    clientConfig.plugins.push(
      new UglifyJsPlugin({
      sourceMap: true
      }),
    );
  }

  return [serverConfig, clientConfig];
};

