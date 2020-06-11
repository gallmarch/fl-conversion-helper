const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

// We need this for a few things
const version = require(path.join(__dirname, 'package.json')).version; // eslint-disable-line import/no-dynamic-require

// Copy the manifest.json, inserting the current version as we go
const copy = new CopyWebpackPlugin([
  // Copy popup menu HTML across
  {
    context: './src/',
    from: 'popup/popup.html',
    to: 'popup/popup.html',
  },
  // Copy manifest.json; replace version number
  {
    context: './src/',
    from: 'manifest.json',
    to: 'manifest.json',
    transform: content => content.toString().replace('$VERSION', `${version}`),
  },
  // Copy app icons
  {
    context: './src/',
    from : 'img',
    to: 'img',
  }
]);

// Define constants at build time
console.info(`NODE_ENV: ${process.env.NODE_ENV}`);
const defineConstants = new webpack.DefinePlugin({
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
});

const zip = new ZipPlugin({
  path: path.join(__dirname, 'dist'),
  filename: `fl-conversion-helper-${version}.zip`,
});

module.exports = {
  entry: {
    'content-script.js': './src/main.jsx',
    'popup/popup.js': './src/popup/main.jsx',
    'background.js': './src/background.js',
  },
  output: {
    path: './build/',
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react'],
        },
      },
    ],
  },
  plugins: [
    copy,
    defineConstants,
    zip,
    new ExtractTextWebpackPlugin('styles.css'),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
