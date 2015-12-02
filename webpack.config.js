var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var SOURCE_PATH = path.resolve(ROOT_PATH, 'src', 'client');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var common = {
  entry: SOURCE_PATH,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: SOURCE_PATH,
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: SOURCE_PATH
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Rx Relay',
    }),
  ],
}

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      proxy: {
            '/model.json*': {
                target: 'http://localhost:3000',
                secure: true,
            },
        },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}
