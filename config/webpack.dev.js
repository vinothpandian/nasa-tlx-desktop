const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packages = require('../package.json');

const vendorList = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-redux',
  'redux',
  'redux-actions',
  'reactstrap',
  'shortid',
  'lodash',
  'rc-slider',
];

module.exports = merge(common, {
  entry: {
    rhl: 'react-hot-loader/patch',
    app: path.join(common.context, 'js', 'app'),
    dashboard: path.join(common.context, 'js', 'dashboard'),
    vendor: vendorList,
  },
  devServer: {
    contentBase: common.output.path,
    host: '127.0.0.1',
    historyApiFallback: true,
    publicPath: '/',
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true,
    },
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(common.output.path, 'index.html'),
      template: path.join(common.context, 'index.html'),
      title: 'Nasa TLX',
      chunks: ['rhl', 'app', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      filename: path.join(common.output.path, 'dashboard.html'),
      template: path.join(common.context, 'index.html'),
      title: 'Nasa TLX - Dashboard',
      chunks: ['dashboard', 'vendor'],
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
