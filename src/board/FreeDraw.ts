import Sprite = Laya.Sprite

export default class FreeDraw extends Sprite {
  constructor() {
    super()
    console.log('我是FreeDraw')
    this.init()
  }

  private init(): void {
    console.log('我是FreeDraw init')
  }

}
