const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.js', // your main JS file
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5 MB
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    static: './build',
    port: 3000
  }
};
