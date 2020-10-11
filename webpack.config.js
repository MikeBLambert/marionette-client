const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config({path: __dirname + '/.env'});

const rootDir = path.join(__dirname);
const webpackEnv = process.env.NODE_ENV || 'development';

const outputPath = process.env.OUTPUT
  ? path.resolve(process.env.OUTPUT, 'dist')
  : path.resolve(rootDir, 'dist');

module.exports = {
  mode: webpackEnv,
  // node: {
  //   fs: 'empty',
  // },
  entry: {
    app: path.join(rootDir, './index.web.js'),
  },
  output: {
    path: outputPath,
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
          path.resolve(__dirname, 'node_modules/react-native-auth0'),
          path.resolve(__dirname, 'node_modules/react-native-dotenv'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['module:metro-react-native-babel-preset'],
            plugins: [
              '@babel/plugin-syntax-class-properties',
              [
                'module:react-native-dotenv',
                {
                  moduleName: '@env',
                  path: './.env',
                  blacklist: null,
                  whitelist: null,
                  safe: false,
                  allowUndefined: true,
                },
              ],
            ],
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
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
      '@env': path.resolve(__dirname, './.env'),
    }),
  },
};
