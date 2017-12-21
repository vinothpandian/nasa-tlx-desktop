const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const paths = {
  DIST: path.resolve(__dirname, '../dist'),
  SRC: path.resolve(__dirname, '../src'),
  JS: path.resolve(__dirname, '../src/js'),
};

module.exports = {
  context: paths.SRC,
  entry: {
    app: path.join(paths.JS, 'app'),
    dashboard: path.join(paths.JS, 'dashboard'),
    vendor: [
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
    ],
  },
  output: {
    path: paths.DIST,
    filename: '[name].bundle.js',
    publicPath: '',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
      minChunks: 2,
    }),
    new HtmlWebpackPlugin({
      filename: path.join(paths.DIST, 'index.html'),
      template: path.join(paths.SRC, 'index.html'),
      title: 'Nasa TLX',
      chunks: ['app', 'vendor'],
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      filename: path.join(paths.DIST, 'dashboard.html'),
      template: path.join(paths.SRC, 'index.html'),
      title: 'Nasa TLX - Dashboard',
      chunks: ['dashboard', 'vendor'],
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new ExtractTextPlugin('style.bundle.css'),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }, {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract({ use: 'css-loader' }),
      }, {
        test: /\.(png|jp(e*)g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      }, {
        test: /\.(scss|sass)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                precss,
                autoprefixer,
              ];
            },
          },
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

};
