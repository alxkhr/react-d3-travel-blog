const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }, {
        test: /\.html$/,
        use: 'html-loader'
      }, {
        test: /\.(jpg|png)$/,
        use: 'url-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: { collapseWhitespace: true },
      favicon: './assets/favicon.ico'
    }),
  ]
};

module.exports = config;
