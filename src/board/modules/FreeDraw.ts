import Event = Laya.Event
import Sprite = Laya.Sprite
// import Stage = Laya.Stage
import { Path, Point} from 'paper'
import Model from './Model'
import { round as _round, flatMapDeep as _flatMapDeep, flatMap as _flatMap } from 'lodash'
// import MySocket from '../../common/Socket'

export default class FreeDraw extends Sprite {
  private domWidth: number
  private domHeight: number
  private points: any[]
  private drawALines: any[]
  private current: any
  private drawing: boolean
  private tempContainer: Sprite
  // private mainContainer: Sprite

  constructor(width, height) {
    super()
    console.log('我是FreeDraw')

    this.current = {x: 0, y: 0, color: '#f00'}
    this.points = []
    this.drawALines = []
    this.tempContainer = new Sprite()
    this.width = width
    this.height = height
    this.name = 'freeDraw'
    this.addChild(this.tempContainer)
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
    this.on('freeDraw_sp', this, this.onMessage)
  }

  private onMouseDown(e): void {
    this.drawing = true

    this.current.x = e.stageX
    this.current.y = e.stageY

    this.points = [[this.current.x, this.current.y]]
  }

  private onMouseUp(e): void {
    if (!this.drawing) {
      return
    }
    this.drawing = false

    let newX = e.stageX
    let newY = e.stageY
    this.drawALine(this.current.x, this.current.y, newX, newY, this.current.color, 2)
    this.current.x = newX
    this.current.y = newY
    this.points.push([newX, newY])

    let curves = this.simplifyLineByCurve(this.points, 10)

    if (!curves.length) {
      return
    }

    this.tempContainer.graphics.clear()
    this.drawABezierCurve(curves[0][0], curves[0][1], curves.slice(1), this.current.color)
    console.log(curves)

    this.emitMessage('bezierCurve', curves)
  }

  private onMouseMove(e): void {
    if (!this.drawing) {
      return
    }

    let newX = e.stageX
    let newY = e.stageY
    
    this.drawALine(this.current.x, this.current.y, newX, newY, this.current.color, 2)

    this.current.x = newX
    this.current.y = newY
    this.points.push([newX, newY])
  }

  private onMessage({name, data}): void {
    switch (name) {
      case "bezierCurve":
        this.drawABezierCurve(data[0][0], data[0][1], data.slice(1), this.current.color)
        // code...
        break;
      
      default:
        // code...
        break;
    }
  }

  private emitMessage(name, data): void {
    console.log(this)
    this.parent.event('board_sp', {name, data})
  }

  private drawALine(x0, y0, x1, y1, color = this.current.color, width = 1): any {
    return this.tempContainer.graphics.drawLine(x0, y0, x1, y1, color, width)
  }

  private drawABezierCurve(x, y, beziers, lineColor, lineWidth = 1):void {
    // [["moveTo",x,y],["lineTo",x,y,x,y,x,y],["arcTo",x1,y1,x2,y2,r],["closePath"]]
    beziers = beziers.map(function(points, index) {
      return ['bezierCurveTo'].concat(points.map(function(p, index) {
         return index % 2 === 0 ? p - x : p - y
      }))
    })

    this.graphics.drawPath(x, y, [['moveTo', 0, 0], ...beziers], null, {strokeStyle: lineColor, lineWidth: 2})
  }

  private simplifyLineByCurve(points: any[], level = 20): any {
    let paperPath = new Path({
      strokeColor: 'green',
      segments: points.slice(0)
    })
    // let segmentCount = paperPath.segments.length
    paperPath.simplify(level)
    // console.log('原始点数', segmentCount)
    // console.log('处理后点数', paperPath.segments.length)
    // console.log('简化效果',  segmentCount - paperPath.segments.length, (segmentCount - paperPath.segments.length) / segmentCount * 100 + '%')
    // console.log(points, paperPath.segments)

    return _flatMap(paperPath.curves, function(curve, index) {
      var curves = _flatMap(curve.points, function(point, index) {
        return [_round(point.x, 1), _round(point.y, 1)]
      })

      //精简数据
      if (index === 0) {
        return [curves.slice(0, 2), curves.slice(2)]
      } else {
        return [curves.slice(2)]
      }
    })
  }

  public destroy(): void {
    this.destroy()
  }
}