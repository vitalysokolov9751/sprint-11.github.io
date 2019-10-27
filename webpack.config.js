const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const newLocal = 'dist';
module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, newLocal),
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: [
            (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            'css-loader', 
            'postcss-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?name=../images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
      }
    ]
  },
  plugins: [ 
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
             preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          global_defs: {
            "@alert": "console.log",
          },
          drop_console: true
        }
      }
    }) 
  ]
};