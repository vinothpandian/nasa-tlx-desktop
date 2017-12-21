const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {

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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
