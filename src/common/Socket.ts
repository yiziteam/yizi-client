/**单例模式*/

import * as SocketIo from 'socket.io-client'
import { getUrlParam } from './util'

'use strict'
/** 如果不将instance放到MySocket外，同一脚本引入单例，不同脚本引入不同实例*/
let __instance = (function () {
  let instance
  return (newInstance: any): any => {
    if (newInstance) instance = newInstance
    return instance
  }
}())

let socketUrl:string
let socket:SocketIo

export default class MySocket {
  private url: string
  private socket: SocketIo
  private uid: string
  private role: string
  private count: number

  private constructor(url: string) {
    //按自己需求实例化

    this.uid = getUrlParam('uid')
    this.role = getUrlParam('role')
    this.url = socketUrl = socketUrl || url
    this.socket = socket = socket || SocketIo(this.url)
    this.count = 0

    console.log(socketUrl, socket)
  }

  public static getInstance(url?: string): MySocket {
    // console.log(__instance(null), url)
    if (__instance(null)) return __instance(null)

    return __instance(new MySocket(url))
  }

  public on(type, cb): MySocket {
    this.socket.on(type, cb)

    return this
  }

  public emit(type, msg:any): MySocket {
    this.socket.emit(type, JSON.stringify({uid: this.uid, sid: this.count++, role: this.role, ...msg}))

    return this
  }
}
