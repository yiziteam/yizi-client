var webpack = require('webpack')
var config = require('../config')
var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var laya = [
		'./static/lib/laya/laya.core.js',
		'./static/lib/laya/laya.webgl.js',
		'./static/lib/laya/laya.ui.js',
	]

module.exports = {
  entry: {
    "laya": laya
  },
  // devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: resolve('static/lib'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // })
  ]
}
