const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const marked = require('marked');
const renderer = new marked.Renderer();

renderer.image = function(href, title, alt) {
  var out = '<figure>';
  out += '<img src="' + href + '" alt="' + alt + '">';
  if (title) {
    out += '<figcaption>' + title + '</figcaption>';
  }
  out += '</figure>';
  return out;
};
renderer.paragraph = function(text) {
  if (text.startsWith('<figure') && text.endsWith('</figure>'))
    return text;
  else
    return '<p>' + text + '</p>';
}

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
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: { renderer }
          }
        ]
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
