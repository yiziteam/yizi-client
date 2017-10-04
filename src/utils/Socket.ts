import * as SocketIo from 'socket.io-client'

export default class MySocket {
  private static __instance: MySocket
  private socket: SocketIo
  private url: string

  constructor(url) {
    this.url = url
    this.socket = SocketIo(url)
  }
  
  public on(...args) {
    MySocket.__instance.socket.on(...args)
    
    return MySocket.__instance
  }
  
  public emit(...args) {
    MySocket.__instance.socket.emit(...args)
    
    return MySocket.__instance
  }

  public static instance(url: string): MySocket {
    if (MySocket.__instance) {
      return MySocket.__instance
    }

    return MySocket.__instance = new MySocket(url)
  }
}
