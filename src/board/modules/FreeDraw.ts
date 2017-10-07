import Event = Laya.Event
import Sprite = Laya.Sprite
import { Path, Point} from 'paper'
import Model from './Model'
// import MySocket from '../utils/Socket'

export default class FreeDraw extends Sprite {
  private domWidth: number
  private domHeight: number
  private points: Array<any>
  private current: any
  private drawing: boolean

  constructor(width, height) {
    super()
    console.log('我是FreeDraw')

    this.current = {x: 0, y: 0, color: 'rgba(0,0,0,0)'}
    this.points = []
    this.width = width
    this.height = height

    this.init()
  }

  private init(): void {
    this.addEvents()
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

    this.simplifyAndSendPath(this.points, 10)
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

  private drawALine(x0, y0, x1, y1, color = 'rgba(0,0,0,0)', width = 2): void {
    this.graphics.drawLine(x0, y0, x1, y1, color, width)
  }

  private drawABezierCurve(x, y, beziers, lineColor, lineWidth = 2):void {

    // [["moveTo",x,y],["lineTo",x,y,x,y,x,y],["arcTo",x1,y1,x2,y2,r],["closePath"]]
    beziers = beziers.map(function(points) {
      return ['bezierCurveTo', ...points.slice(2)]
    })

    console.log([['moveTo', x, y], ...beziers], lineColor, lineWidth)
    this.graphics.drawPath(x, y, [['moveTo', x, y], ...beziers], {}, {strokeStyle: lineColor, lineWidth: 2})
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
    console.log(points, paperPath.segments)

    var curves = paperPath.curves.map(function(curve, index) {
      var points = []

      curve.points.forEach(function(point, index) {
        points.push(point.x, point.y)
      })

      return points
    })

    this.drawABezierCurve(curves[0][0], curves[0][1], curves, '#f00')
    // console.log(curves)
    // MySocket
    //   .getInstance(Model.getSocketUrl())
    //   .emit('board', JSON.stringify(paperPath.segments))
  }

  public destroy(): void {
    this.destroy()
  }
}