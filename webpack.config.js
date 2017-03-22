const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

// We need this for a few things
const version = require(path.join(__dirname, 'package.json')).version;

// Copy the manifest.json, inserting the current version as we go
const copy = new CopyWebpackPlugin([
  {
    context: './src/',
    from: 'popup/popup.html',
    to: 'popup/popup.html',
  },
  {
    context: './src/',
    from: 'manifest.json',
    to: 'manifest.json',
    transform: (content) => {
      return content.toString().replace('VERSION', `"${version}"`);
    },
  },
]);

const zip = new ZipPlugin({
  path: path.join(__dirname, 'dist'),
  filename: `fl-tiered-items-${version}.zip`,
});

module.exports = {
  entry: {
    'content-script.js': './src/content-script.js',
    'popup/popup.js': './src/popup/popup.js',
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
          use: ['css-loader', 'sass-loader']
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'stage-0'] },
      },
    ],
  },
  plugins: [
    copy,
    zip,
    new ExtractTextWebpackPlugin('styles.css'),
  ],
};
