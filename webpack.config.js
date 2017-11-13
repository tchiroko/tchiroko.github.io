const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const dev = process.env.NODE_ENV == 'dev';

let config = {
  entry: {
    main: [
      'jquery',
      'babel-polyfill',
      'bootstrap',
      './css/main.scss',
      './js/main.js',
    ],
  },
  watch: dev,
  output: {
    path: path.resolve('./assets'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/assets/',
  },
  resolve: {
    alias: {
      node_modules: path.resolve(__dirname, 'node_modules'),
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  amd: {
    jQuery: true,
  },
  devtool: dev ? 'cheap-module-eval-source-map' : false,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              'presets': [
                  ['stage-2'],
                  ['es2015',  {'modules': false}],
                ],
              'plugins': [
                'transform-runtime',
                'syntax-dynamic-import'
              ]
            }
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 0,
                  minimize: !dev,
                },
              },
            ],
          }
        ),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  minimize: !dev,
                },
              },
              'sass-loader',
            ],
          }
        ),
      },
      {
        test: /\.(woff2|woff|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: dev ? '[name].[ext]' : '[name].[hash:7].[ext]',
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin(
      {
        filename: '[name].css',
      }
    ),
    new CleanWebpackPlugin(
      ['assets'],
      {
        root: path.resolve('./'),
        verbose: true,
        dry: false,
      }
    ),
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: 'common', // Specify the common bundle's name.
        minChunks: Infinity,
      }
    ),
    new webpack.ProvidePlugin(
      {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
      }
    ),

  ],
};

if (!dev) {
  config.plugins.push(new UglifyJSPlugin(
    {
      comments: false,
      uglifyOptions: {
        compress: true,
        warnings: false,
      },
    }
  ));
}

module.exports = config;
