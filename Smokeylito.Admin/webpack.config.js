const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlAssetNameReplacerPlugin = require('./utilities/html-assetname-replacer-plugin');

module.exports = (env, argv) => {
  console.log('Building client for: ' + argv.mode);

  const isEnvProduction = argv.mode === 'production';
  const isEnvDevelopment = argv.mode === 'development';

  const clientConfig =  {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development', 
    devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'eval-source-map',
    devServer: {
      contentBase: './public',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    entry: {
      index: './client/index.tsx',
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: isEnvProduction [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
          sourceMap: true,
        }),

        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: {
              inline: false,
              annotation: true,
            }
          },
        })
      ],
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
      path: path.resolve(__dirname, './public/dist/'),
      publicPath: 'http://localhost:8080/dist/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: argv.mode === 'production' ? '[name].[hash].css' : '[name].css',
      }),
      new HtmlAssetNameReplacerPlugin({
        hot: argv.hot
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
      }),
    ],
    performance: false
  };

  if(env && env.analyze){
    clientConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  if(!argv.hot && isEnvDevelopment){
    clientConfig.plugins.push(new CleanWebpackPlugin(['./public/dist']));
  }

  return clientConfig;
};

