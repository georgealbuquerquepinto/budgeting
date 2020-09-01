const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      URL_API_OPEN: JSON.stringify('http://localhost:3000/api'),
      URL_API: JSON.stringify('http://localhost:3000/oapi'),
      BASENAME: JSON.stringify('/'),
      SHOW_DEV_TOOLS: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/template.html',
    }),
  ],
  devServer: {
    port: 8000,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    open: true,
    openPage: '',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      modules: path.join(__dirname, '/node_modules'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['@babel/react'],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-object-rest-spread',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /fabric(\.min)?\.js$/,
        use: 'exports-loader?fabric',
      },
    ],
  },
};
