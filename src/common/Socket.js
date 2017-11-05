/**单例模式*/

import * as SocketIo from 'socket.io-client'
import { getUrlParam } from './util'

'use strict'
/** 如果不将instance放到MySocket外，同一脚本引入单例，不同脚本引入不同实例*/
let __instance = (function () {
  let instance
  return (newInstance) => {
    return (instance = newInstance || instance)
  }
}())

let socketUrl = ''
let socket = null


export default class MySocket {
  constructor(url) {
    //按自己需求实例化
    this.uid = getUrlParam('uid')
    this.role = getUrlParam('role')
    this.url = socketUrl = socketUrl || url
    this.socket = socket = socket || SocketIo(this.url)
    this.count = 0

    console.log(socketUrl, socket)
  }

  static getInstance(url) {
    // console.log(__instance(null), url)
    if (__instance(null)) return __instance(null)

    return __instance(new MySocket(url))
  }

  on(type, cb) {
    this.socket.on(type, cb)

    return this
  }

  emit(type, msg) {
    this.socket.emit(type, JSON.stringify({uid: this.uid, sid: this.count++, role: this.role, ...msg}))

    return this
  }
}
