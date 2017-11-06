import * as $ from 'jquery'
import {random, merge} from "lodash"
import {Sprite, Stage, WebGL}  from "Laya"
import FreeDraw from './modules/FreeDraw'
import Model from './modules/model'
import paper from 'paper'
import MySocket from '@/common/Socket'
import {isSupportWebGL} from '@/common/util'

export default class Board {
  constructor(domId) {
    this._initVars()
    this._initDom(domId)
    this._initLayer()
    this._initEvent()
    this._initSocket()
  }

  _initVars() {
    //罗列属性
    this.$box = null
    this.$layaContainer = null
    this.$layaCanvas = null
    this.$paperCanvas = null
    this.$paperProject = null

    this.boxId = ''
    this.canvasWidth = 0
    this.canvasHeight = 0

    this.container = null
    this.freeDraw = null
  }

  _initDom(boxId) {
    this.boxId = boxId
    this.$box = document.querySelector(boxId)
    this.canvasWidth = this.$box.clientWidth
    this.canvasHeight = this.$box.clientHeight

    if (isSupportWebGL()) {
      console.log('supportWebGL')
      Laya.init(this.canvasWidth, this.canvasHeight, WebGL)
    } else {
      console.log('notSupportWebGL')
      Laya.init(this.canvasWidth, this.canvasHeight)
    }

    this.$layaContainer = document.querySelector('#layaContainer')
    this.$layaCanvas = document.querySelector('#layaCanvas')
    this.$box.prepend(this.$layaContainer)

    Model.canvasWidth = this.canvasWidth
    Model.canvasHeight = this.canvasHeight
    Model.canvasOffset = $(this.$box).offset()

    this._initPaper()
  }

  _initLayer() {
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

  _initPaper() {
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
    this.$box.appendChild(this.$paperCanvas)
    this.$paperProject = paper.setup('paperCanvas')
  }

  _initSocket() {
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

  _initEvent() {
    Laya.stage.on("resize", this, this.onResize)
    this.container.on('board_sp', this, this.onSendMessage)
  }

  _onResize() {
    // this._copyLayaCavasStyle2PaperCanvas()
  }

  _onSendMessage({name, data}) {
    MySocket
      .getInstance().emit('board_msg', {name, data})
  }

  _onReceiveMessage({name, data}) {
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

  _copyLayaCavasStyle2PaperCanvas() {
    this.$paperCanvas.style.transformOrigin = this.$layaCanvas.style.transformOrigin
    this.$paperCanvas.style.transform = this.$layaCanvas.style.transform
  }
}

window.Board = Board

window.board = new Board('#app')

