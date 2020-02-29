const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',

  output: {
      path: __dirname,
      filename: './dist/bundle.js'
  },
  
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          }
        ],
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),

    new HtmlWebpackPlugin({ 
      template: './index.html'
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: path.join(__dirname, './dist'),
    open: true, 
    port: 3000,
  }
};