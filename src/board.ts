import { random, merge } from "lodash"
import Sprite = Laya.Sprite
import Text = Laya.Text

export default class Board {
  private container: Sprite
  private socket: any
  private $dom: any
  // private $canvas: any
  private $layaContainer: any
  private domId: string
  private domWidth: number
  private domHeight: number

  constructor(domId: string) {
    this.initDom(domId)
    this.drawTxt('Hello layabox', {
      color: '#FF0000',
      fontSize: 66,
      stroke: 5,
      strokeColor: '#fff',
      bold: true,
      x: 60,
      y: 100
    })
  }

  private initDom(domId: string): void {
    this.domId = domId
    this.$dom = document.querySelector(domId)
    this.domWidth = this.$dom.clientWidth
    this.domHeight = this.$dom.clientHeight

    Laya.init(this.domWidth, this.domHeight)
    this.$layaContainer = document.querySelector('#layaContainer')
    this.$dom.append(this.$layaContainer)
  }

  public drawTxt(text: string, style: any): void {
    var txt = new Text()
    var x = style.x
    var y = style.y

    delete style.x
    delete style.y

    merge(txt, style, {text})

    txt.pos(x, y)

    Laya.stage.bgColor = '#23238E'
    Laya.stage.addChild(txt)
  }

  private initDraw(): void {
   this.container = new Sprite();
   Laya.stage.addChild(this.container);


   var sp = new Sprite();
   //画圆
   sp.graphics.drawCircle(80, 80, random(0, 300), "#ff0000");
   this.container.addChild(sp);
  }
}

window.Board = Board