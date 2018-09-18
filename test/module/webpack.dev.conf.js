const path = require('path')

module.exports = {
  entry: './test/module/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/test/module'
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
      {
        test: /\.(svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=4096',
      }
    ]
  },
  devServer: {
    hot: false,
    host: 'localhost',
    port: '8097',
    open: true,
    publicPath: '/test/module',
    openPage: 'test/module',
  },
}
