/**单例模式*/

import * as SocketIo from 'socket.io-client'

'use strict'
/** 如果不将instance放到MySocket外，同一脚本引入单例，不同脚本引入不同实例*/
var __instance = (function () {
  let instance
  return (newInstance: any): any => {
    if (newInstance) instance = newInstance
    return instance
  }
}())


export default class MySocket {
  private url: string
  private socket: SocketIo

  private constructor(url: string) {
    //按自己需求实例化
    this.url = url
    this.socket = SocketIo(url)
  }

  public static getInstance(url: string): MySocket {
    console.log(__instance(null), url)
    if (__instance(null)) return __instance(null)

    return __instance(new MySocket(url))
  }

  public on(...args): MySocket {
    this.socket.on(...args)

    return this
  }

  public emit(...args): MySocket {
    this.socket.emit(...args)

    return this
  }
}
