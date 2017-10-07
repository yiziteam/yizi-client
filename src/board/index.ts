import * as $ from 'jquery'
import {random, merge} from "lodash"
import Sprite = Laya.Sprite
import Stage = Laya.Stage
import FreeDraw from './modules/FreeDraw'
import Model from './modules/Model'
import { setup as setupPaper, DomEvent as paperDomEvent } from 'paper'
import MySocket from '../common/Socket'

interface PNode {
  emit()
}

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
    this.initSocket()
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
    this.container.name = 'main'
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
    this.$paperCanvas.style.display = 'none'
    this.copyLayaCavasStyle2PaperCanvas()

    this.$box.appendChild(this.$paperCanvas)
    this.$paperProject = setupPaper(this.$paperCanvas.id)
  }

  private initSocket():void {
    MySocket
      .getInstance('http://localhost:3000/')
      .emit('board_msg', {type: 'enterRoom'})
      .on('board_msg', (e) => {
        var result = JSON.parse(e)

        if (result.type === 'response') {
          return console.log('socket result: ', result.code == 200 ? 'success' : 'false')
        }

        this.onReceiveMessage(result)
      })
  }

  private initEvent():void {
    Laya.stage.on("resize", this, this.onResize)
    this.container.on('board_sp', this, this.onSendMessage)
  }

  private onResize():void {
    this.copyLayaCavasStyle2PaperCanvas()
  }

  private onSendMessage({name, data}):void {
    MySocket
      .getInstance().emit('board_msg', {name, data})
  }

  private onReceiveMessage({name, data}):void {
    switch (name) {
      case 'bezierCurve':
        this.freeDraw.event('freeDraw_sp', {name, data})
        // code...
        break
      
      default:
        // code...
        break
    }
  }

  private copyLayaCavasStyle2PaperCanvas():void {
    this.$paperCanvas.style.transformOrigin = this.$layaCanvas.style.transformOrigin
    this.$paperCanvas.style.transform = this.$layaCanvas.style.transform
  }
}

window.Board = Board

window.board = new Board('#app')

