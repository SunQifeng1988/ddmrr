const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const AssetsPlugin = require('assets-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const rules = require('./webpack/commonRules.js');

const config = {
  entry: {
    index: './ddmrr/index.js',
    // ddmrr: './ddmrr/test.js',
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build/assets/'),
    publicPath: './static/assets/',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // new UglifyJSPlugin({
    //   // beautify: true,
    // }),
  ],
  module: {
    rules,
  },
};

module.exports = config;
