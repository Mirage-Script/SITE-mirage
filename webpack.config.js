const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

const envFiles = [`.env.${mode}`, '.env'];

envFiles.forEach((file) => {
  const envPath = path.resolve(__dirname, file);
  dotenv.config({ path: envPath, override: true });
});

const allowedEnvKeys = ['NODE_ENV', 'SUPABASE_URL', 'SUPABASE_ANON_KEY'];

const envVariables = allowedEnvKeys.reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(process.env[key] ?? '');
  return acc;
}, {});

module.exports = {
  mode,
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    filename: isProduction ? 'static/js/[name].[contenthash].js' : 'static/js/[name].js',
    chunkFilename: isProduction ? 'static/js/[name].[contenthash].chunk.js' : 'static/js/[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true
  },
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  stats: {
    errorDetails: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('.module.css')
              }
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name][hash][ext][query]'
        }
      },
      {
        test: /\.(woff2?|ttf|eot|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name][hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
        : false
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? 'static/css/[name].[contenthash].css' : 'static/css/[name].css',
      chunkFilename: isProduction ? 'static/css/[name].[contenthash].chunk.css' : 'static/css/[name].chunk.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new webpack.DefinePlugin(envVariables)
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: 'single'
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public')
    },
    historyApiFallback: true,
    hot: true,
    port: 3000,
    open: true,
    client: {
      overlay: true
    }
  },
  performance: {
    hints: false
  }
};
