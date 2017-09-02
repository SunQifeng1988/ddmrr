// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = [{
  test: /\.js$/,
  exclude: path.join(__dirname, '../node_modules'),
  loader: 'babel-loader',
}, {
  test: /\.scss$/,
  // https://webpack.js.org/plugins/extract-text-webpack-plugin/#components/sidebar/sidebar.jsx
  use: [
    {
      // style-loader embed the styles into html, but sometimes it makes the js file bigger
      // extract text OR use style loader
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        // CSS Loader https://github.com/webpack/css-loader
        importLoaders: 1,
        sourceMap: true,
        // CSS Modules https://github.com/css-modules/css-modules
        // modules: true,
        // localIdentName: '[name]-[local]-[hash:base64:5]', // no module in this project
        // CSS Nano http://cssnano.co/options/
        minimize: false,
        discardComments: {
          removeAll: true,
        },
      },
    },
    // postcss-loader should before sass-loader
    {
      loader: 'postcss-loader',
      options: {
        config: './webpack/postcss.config.js',
      },
    },
    {
      loader: 'sass-loader', // compiles Sass to CSS
    },
  ],
}];
