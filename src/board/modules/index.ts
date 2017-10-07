import * as $ from 'jquery'
import {random, merge} from "lodash"
import Sprite = Laya.Sprite
import Stage = Laya.Stage
import FreeDraw from './FreeDraw'
import Model from './Model'
// import { setup as setupPaper } from 'paper'

export default class Board {
  private $box: any
  private $layaContainer: any
  private $layaCanvas: any
  private $paperCanvas: any

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
    // this.$layaContainer.style.width = this.canvasWidth + 'px'
    // this.$layaContainer.style.height = this.canvasHeight + 'px'

    // this.$layaCanvas = document.querySelector('#layaCanvas')
    this.$box.appendChild(this.$layaContainer)

    Model.canvasWidth = this.canvasWidth
    Model.canvasHeight = this.canvasHeight
    Model.canvasOffset = $(this.$box).offset()

    // this.initPaper()
  }

  private initLayer():void {
    Laya.stage.setScreenSize(this.canvasWidth * 2, this.canvasHeight * 2)

    this.container = new Sprite()
    Laya.stage.addChild(this.container)
    // Laya.stage.alignV = Stage.ALIGN_MIDDLE
    // Laya.stage.alignH = Stage.ALIGN_CENTER
    Laya.stage.scaleMode = Stage.SCALE_NOBORDER
    // Laya.stage.width = this.canvasWidth
    // Laya.stage.height = this.canvasHeight

    Laya.stage.screenMode = Stage.SCREEN_NONE
    Laya.stage.bgColor = "#232628"

    this.freeDraw = new FreeDraw(this.canvasWidth, this.canvasHeight)
    this.container.addChild(this.freeDraw)
  }

  private initPaper() {
    // 使用paper.js工具前需先初始化容器
    this.$paperCanvas = document.createElement('canvas')
    this.$paperCanvas.id = 'paperCanvas'
    this.$paperCanvas.width = this.canvasWidth
    this.$paperCanvas.height = this.canvasHeight
    this.$paperCanvas.style.position = 'absolute'
    this.$paperCanvas.style.top = 0
    this.$paperCanvas.style.left = 0
    this.$paperCanvas.style.pointerEvents = 'none'

    this.$box.appendChild(this.$paperCanvas)
    // setupPaper(this.$paperCanvas.id)
  }

}

window.Board = Board
