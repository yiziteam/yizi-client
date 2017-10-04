import * as $ from 'jquery'
import {random, merge} from "lodash"
import Sprite = Laya.Sprite
import Stage = Laya.Stage
import FreeDraw from './board/FreeDraw'
import Model from './board/Model'
import Socket from './utils/Socket'

export default class Board {
  private $box: any
  private $layaContainer: any
  private boxId: string
  private canvasWidth: number
  private canvasHeight: number

  private container: Sprite
  private freeDraw: FreeDraw

  constructor(domId: string) {
    this.initDom(domId)
    this.initLayer()
  }

  private initDom(boxId: string): void {
    this.boxId = boxId
    this.$box = document.querySelector(boxId)
    this.canvasWidth = this.$box.clientWidth
    this.canvasHeight = this.$box.clientHeight

    Laya.init(this.canvasWidth, this.canvasHeight)
    this.$layaContainer = document.querySelector('#layaContainer')
    this.$layaContainer.style.width = this.canvasWidth + 'px'
    this.$layaContainer.style.height = this.canvasHeight + 'px'
    this.$box.append(this.$layaContainer)

    Model.canvasWidth = this.canvasWidth
    Model.canvasHeight = this.canvasHeight
    Model.canvasOffset = $(this.$box).offset()
  }

  private initLayer():void {
    this.container = new Sprite();
    Laya.stage.addChild(this.container);
    // Laya.stage.alignV = Stage.ALIGN_MIDDLE;
    // Laya.stage.alignH = Stage.ALIGN_CENTER;

    Laya.stage.screenMode = Stage.SCREEN_NONE;
    Laya.stage.bgColor = "#232628";

    this.freeDraw = new FreeDraw(this.canvasWidth, this.canvasHeight)
    this.container.addChild(this.freeDraw)
  }

}

window.Board = Board
