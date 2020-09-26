const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = process.env.OUTPUT || path.join(__dirname);
const webpackEnv = process.env.NODE_ENV || 'development';

console.log({rootDir});
module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.join(rootDir, './index.web.ts'),
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'app-[hash].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(
          __dirname,
          'node_modules/react-native-vector-icons',
        ),
      },
      {
        test: /\.(js|jsx|tsx|ts|mjs)$/,
        include: [
          path.resolve(__dirname, 'node_modules/react-native-elements'),
          path.resolve(__dirname, 'node_modules/react-native-gesture-handler'),
          path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
          path.resolve(__dirname, 'node_modules/react-native-ratings'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:metro-react-native-babel-preset'],
            plugins: ['@babel/plugin-syntax-class-properties'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './web/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [
      'index.tsx',
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ],
    alias: Object.assign({
      'react-native$': 'react-native-web',
    }),
  },
};
