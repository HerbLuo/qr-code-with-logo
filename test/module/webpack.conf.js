const path = require('path')

module.exports = {
  entry: './test/module/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|lib/
      },
    ]
  },
  devServer: {
    hot: false,
    host: '0.0.0.0',
    port: '8097',
    open: true,
    publicPath: '/test/module',
    openPage: '/test/module',
  },
}
