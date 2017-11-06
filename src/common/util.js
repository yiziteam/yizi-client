export function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)

  return r !== null && r !== undefined ? r[2] : ''
}

export function isPC() {
  return !((/(iphone|ipod|ipad|android|ios|symbianos)/i).test(window.navigator.userAgent))
}

export function isSupportWebGL() {
  var canvas = document.createElement('canvas')

  return !!canvas.getContext("experimental-webgl")
}