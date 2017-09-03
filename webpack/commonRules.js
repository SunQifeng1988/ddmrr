// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = [{
  test: /\.js$/,
  exclude: path.join(__dirname, '../node_modules'),
  loader: 'babel-loader',
}];
