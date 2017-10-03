import SocketIo from 'socket.io-client'

var __instance = (function () {
  let instance
  return (newInstance) => {
    if (newInstance) instance = newInstance
    return instance
  }
}())

export default class SocketIO {
  constructor(url) {
    if (__instance()) return __instance()
    __instance(this)
    
    this.url = url
    this.socket = new SocketIo(url)
  }
  
  static on(...args) {
    if (__instance()) {
      __instance().socket.on(...args)
    } else {
      console.warn('expected new Socket first')
    }
    
    return __instance()
  }
  
  static emit(...args) {
    if (__instance()) {
      __instance().socket.emit(...args)
    } else {
      console.warn('expected new Socket first')
    }
    
    return __instance()
  }
}
