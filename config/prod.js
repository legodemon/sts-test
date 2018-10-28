const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodConfig = (sourcePath) => ({
  mode: 'production',
  context: sourcePath,
  entry: {
    app: `${sourcePath}/app/main.tsx`
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'bundle.js',
    chunkFilename: 'bundle.chunck.[chunkhash].js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior messageTo not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      src: sourcePath
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: ['ts-loader'].filter(Boolean)
      },
      // css
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options:
              {
                includePaths: [sourcePath],
              }
          }
        ]
      },
      // static assets
      {
        test: /\.(mp3|wav)$/,
        use: 'file-loader'
      },
      { test: /\.(a?png|gif)$/, use: 'url-loader?limit=10000' },
      {
        test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/'
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      chunkFilename: `bundle.css`,
      filename: `bundle.css`,
      disable: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html',
      minify: false
    }),
  ],
});

module.exports = prodConfig;
