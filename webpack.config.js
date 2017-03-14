const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: ['./src/index.js', './_redirects'],
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
        use: 'file-loader'
      }, {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader']
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /_redirects/,
        use: 'file-loader?name=[name]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: { collapseWhitespace: true },
      favicon: './favicon.ico'
    }),
  ]
};

module.exports = config;
