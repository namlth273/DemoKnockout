const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true

  return {
    mode: 'development',
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      // open: true,
      port: 9002
    },
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    module: {
      rules: [{
          test: /\.ts$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'ts-loader'
          ]
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'src/styles'),
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, 'src/styles/_variables.scss'),
                  path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/scss/solid.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap/scss/_functions.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap/scss/_variables.scss'),
                  path.resolve(__dirname, 'node_modules/bootstrap/scss/_mixins.scss')
                ]
              }
            },
          ]
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts/'
            }
          }]
        },
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        "@": path.resolve(__dirname, 'src'),
    }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Development',
        template: 'index.html',
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        _: 'lodash',
        ko: 'exports-loader?!knockout'
      })
    ]
  }
};