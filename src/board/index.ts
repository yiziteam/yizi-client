import * as $ from 'jquery'
import {random, merge} from "lodash"
import Sprite = Laya.Sprite
import Stage = Laya.Stage
import FreeDraw from './modules/FreeDraw'
import Model from './modules/Model'
import { setup as setupPaper, DomEvent as paperDomEvent } from 'paper'

export default class Board {
  private $box: any
  private $layaContainer: any
  private $layaCanvas: any
  private $paperCanvas: any
  public  $paperProject: any

  private boxId: string
  private canvasWidth: number
  private canvasHeight: number

  private container: Sprite
  private freeDraw: FreeDraw

  constructor(domId: string) {
    this.initDom(domId)
    this.initLayer()
    this.initEvent()
  }

  private initDom(boxId: string): void {
    this.boxId = boxId
    this.$box = document.querySelector(boxId)
    this.canvasWidth = this.$box.clientWidth
    this.canvasHeight = this.$box.clientHeight

    Laya.init(this.canvasWidth, this.canvasHeight)
    this.$layaContainer = document.querySelector('#layaContainer')
    this.$layaCanvas = document.querySelector('#layaCanvas')
    this.$box.appendChild(this.$layaContainer)

    Model.canvasWidth = this.canvasWidth
    Model.canvasHeight = this.canvasHeight
    Model.canvasOffset = $(this.$box).offset()

    this.initPaper()
  }

  private initLayer():void {
    Laya.stage.setScreenSize(this.canvasWidth * 2, this.canvasHeight * 2)

    this.container = new Sprite()
    Laya.stage.addChild(this.container)

    Laya.stage.alignV = Stage.ALIGN_MIDDLE
    Laya.stage.alignH = Stage.ALIGN_CENTER
    Laya.stage.scaleMode = Stage.SCALE_NOBORDER
    Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL
    Laya.stage.bgColor = "#232628"

    this.freeDraw = new FreeDraw(this.canvasWidth, this.canvasHeight)
    this.container.addChild(this.freeDraw)
  }

  private initPaper():void {
    // 使用paper.js工具前需先初始化容器
    this.$paperCanvas = document.createElement('canvas')
    this.$paperCanvas.id = 'paperCanvas'
    this.$paperCanvas.width = this.canvasWidth
    this.$paperCanvas.height = this.canvasHeight
    this.$paperCanvas.style.position = 'absolute'
    this.$paperCanvas.style.top = 0
    this.$paperCanvas.style.left = 0
    this.$paperCanvas.style.pointerEvents = 'none'
    this.copyLayaCavasStyle2PaperCanvas()

    this.$box.appendChild(this.$paperCanvas)
    this.$paperProject = setupPaper(this.$paperCanvas.id)
  }

  private initEvent():void {
    Laya.stage.on("resize", this, this.onResize)
  }

  private onResize():void {
    this.copyLayaCavasStyle2PaperCanvas()
  }

  private copyLayaCavasStyle2PaperCanvas():void {
    this.$paperCanvas.style.transformOrigin = this.$layaCanvas.style.transformOrigin
    this.$paperCanvas.style.transform = this.$layaCanvas.style.transform
  }
}

window.Board = Board

window.board = new Board('#app')

