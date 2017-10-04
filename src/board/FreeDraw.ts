import Event = Laya.Event
import Sprite = Laya.Sprite
// import * as paper from 'paper'
import { setup as setupPaper, Path, Point} from 'paper'
import Model from './Model'
import MySocket from '../utils/Socket'

export default class FreeDraw extends Sprite {
  private domWidth: number
  private domHeight: number
  private points: Array<any>
  private current: any
  private drawing: boolean

  private paperCanvas: any
  // private paperPathData: Array<any>

  constructor(width, height) {
    super()
    console.log('我是FreeDraw')

    this.current = {x: 0, y: 0, color: '#F00'}
    this.points = []
    this.width = width
    this.height = height

    this.init()
  }

  private init(): void {
    console.log('我是FreeDraw init')
    // console.log(Socket.on)
    // console.log(Socket.emit)
    this.initPaper()
    this.addEvents()
  }

  private initPaper() {
    // 使用paper.js工具前需先初始化容器
    this.paperCanvas = document.createElement('canvas')
    this.paperCanvas.id = 'paperCanvas'
    // this.paperCanvas.position = 'absolute'
    this.paperCanvas.width = this.width
    this.paperCanvas.height = this.height
    this.paperCanvas.style.position = 'absolute'
    this.paperCanvas.style.top = 0
    this.paperCanvas.style.left = 0
    this.paperCanvas.style.pointerEvents = 'none'

    document.body.appendChild(this.paperCanvas)
    setupPaper(this.paperCanvas.id)
  }

  private addEvents(): void {
    this.on(Event.MOUSE_DOWN, this, this.onMouseDown)
    this.on(Event.MOUSE_UP, this, this.onMouseUp)
    this.on(Event.MOUSE_OUT, this, this.onMouseUp)
    this.on(Event.MOUSE_MOVE, this, this.onMouseMove)
  }

  private onMouseDown(e): void {
    this.drawing = true

    this.current.x = Model.relX(e.stageX)
    this.current.y = Model.relY(e.stageY)

    this.points = [[this.current.x, this.current.y]]
  }

  private onMouseUp(e): void {
    if (!this.drawing) {
      return
    }
    this.drawing = false

    var newX = Model.relX(e.stageX)
    var newY = Model.relY(e.stageY)
    this.drawALine(this.current.x, this.current.y, newX, newY, this.current.color, 2)
    this.current.x = newX
    this.current.y = newY
    this.points.push([newX, newY])

    this.simplifyAndSendPath(this.points, 30)
  }

  private onMouseMove(e): void {
    if (!this.drawing) {
      return
    }

    var newX = Model.relX(e.stageX)
    var newY = Model.relY(e.stageY)
    this.drawALine(this.current.x, this.current.y, newX, newY, this.current.color, 2)
    this.current.x = newX
    this.current.y = newY
    this.points.push([newX, newY])
  }

  private drawALine(x0, y0, x1, y1, color = '#F00', width = 2): void {
    this.graphics.drawLine(x0, y0, x1, y1, color, width)
  }

  private simplifyAndSendPath(points, level = 10): any {
    var paperPath = new Path({
      strokeColor: 'green',
      segments: points.slice(0)
    })
    var segmentCount = paperPath.segments.length

    paperPath.simplify(level)

    console.log('原始点数', segmentCount)
    console.log('处理后点数', paperPath.segments.length)
    console.log('简化效果',  segmentCount - paperPath.segments.length, (segmentCount - paperPath.segments.length) / segmentCount * 100 + '%')

    // MySocket
    //   .instance(Model.socketUrl)
    //   .emit('board', JSON.stringify(paperPath.segments))
  }

  public destroy(): void {
    this.destroy()
  }
}