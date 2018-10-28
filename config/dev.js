const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const devConfig = (sourcePath) => ({
  mode: 'development',
  context: sourcePath,
  entry: {
    bundle: `${sourcePath}/app/main.tsx`
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: 'bundle.chunck.[chunkhash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      src: sourcePath,
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
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
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/'
          }
        }]
      },
      { test: /\.(a?png|gif)$/, use: 'url-loader?limit=10000' },
      {
        test: /\.(mp3|wav)$/,
        use: 'file-loader'
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
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new WebpackCleanupPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html',
      minify: false
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    clientLogLevel: 'warning'
  },
  devtool: 'cheap-module-eval-source-map',
  node: {
    fs: 'empty',
    net: 'empty'
  }
});

module.exports = devConfig;
