const path = require('path');
const NodemonBrowsersyncPlugin = require('nodemon-browsersync-webpack-plugin');

module.exports = {
    mode: 'production',
    context: path.join(__dirname, './'),
    entry: './client/index.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: path.join(__dirname, 'client')
        },
        {
          test:/\.css$/,
          use:['style-loader','css-loader']
        }
      ]
    }
  };