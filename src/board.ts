import {random, merge} from "lodash"
import Sprite = Laya.Sprite
import Stage = Laya.Stage
import FreeDraw from './board/FreeDraw'

export default class Board {
  private $dom: any
  private $layaContainer: any
  private domId: string
  private domWidth: number
  private domHeight: number

  private container: Sprite
  private freeDraw: FreeDraw

  constructor(domId: string) {
    this.initDom(domId)
    this.initLayer()
  }

  private initDom(domId: string): void {
    this.domId = domId
    this.$dom = document.querySelector(domId)
    this.domWidth = this.$dom.clientWidth
    this.domHeight = this.$dom.clientHeight

    Laya.init(this.domWidth, this.domHeight)
    this.$layaContainer = document.querySelector('#layaContainer')
    this.$layaContainer.style.width = this.domWidth + 'px'
    this.$layaContainer.style.height = this.domHeight + 'px'
    this.$dom.append(this.$layaContainer)
  }

  private initLayer():void {
    this.container = new Sprite();
    Laya.stage.addChild(this.container);
    // Laya.stage.alignV = Stage.ALIGN_MIDDLE;
    // Laya.stage.alignH = Stage.ALIGN_CENTER;

    Laya.stage.screenMode = Stage.SCREEN_NONE;
    Laya.stage.bgColor = "#232628";

    this.freeDraw = new FreeDraw(this.domWidth, this.domHeight)
    this.container.addChild(this.freeDraw)
  }

}

window.Board = Board
