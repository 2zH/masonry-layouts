const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const entry = './index.js'
const output = {
  path: path.resolve(__dirname, './'),
  filename: 'bundle.js'
}

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: [
      ['@babel/env', {
        "targets": {
          "chrome": 64
        }
      }]
    ],
    plugins: [
      '@babel/proposal-do-expressions',
      '@babel/proposal-function-bind',
      '@babel/proposal-pipeline-operator',
      '@babel/proposal-class-properties',
      '@babel/proposal-decorators'
    ]
  }
}
const rules = [
  {
    test: /\.js$/,
    use: babelLoader
  }
]

module.exports = {
  entry,
  output,
  module: {
    rules
  },
  devServer: {
    contentBase: './',
    open: true,
    quiet: true,
    watchOptions:{
      poll: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}