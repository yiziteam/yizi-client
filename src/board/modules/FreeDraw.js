import { Event, Sprite } from 'Laya'
import { Path, Point} from 'paper'
import { round, flatMap } from 'lodash'
import model from './model'
let _ = { round, flatMap }

export default class FreeDraw extends Sprite {
  constructor(width, height) {
    super()
    console.log('我是FreeDraw')

    this.current = {x: 0, y: 0, color: '#f00'}
    this.points = []
    // this._drawALines = []
    this.tempContainer = new Sprite()
    this.width = width
    this.height = height
    this.name = 'freeDraw'
    this.addChild(this.tempContainer) //继承
    this._init()
  }

  _init() {
    this._addEvents()
  }

  _addEvents() {
    this.on(Event.MOUSE_DOWN, this, this._onMouseDown)
    this.on(Event.MOUSE_UP, this, this._onMouseUp)
    this.on(Event.MOUSE_OUT, this, this._onMouseUp)
    this.on(Event.MOUSE_MOVE, this, this._onMouseMove)
    this.on('freeDraw_sp', this, this._onMessage)
  }

  _onMouseDown(e) {
    this.drawing = true

    this.current.x = e.stageX
    this.current.y = e.stageY

    this.points = [[this.current.x, this.current.y]]
  }

  _onMouseUp(e) {
    if (!this.drawing) {
      return
    }
    this.drawing = false

    let newX = e.stageX
    let newY = e.stageY
    this._drawALine(this.current.x, this.current.y, newX, newY, this.current.color, 2)
    this.current.x = newX
    this.current.y = newY
    this.points.push([newX, newY])

    let curves = this._simplifyLineByCurve(this.points, 10)

    if (!curves.length) {
      return
    }

    this.tempContainer.graphics.clear()
    this._drawABezierCurve(curves[0][0], curves[0][1], curves.slice(1), this.current.color)
    console.log(curves)

    this.emitMessage('bezierCurve', curves)
  }

  _onMouseMove(e) {
    if (!this.drawing) {
      return
    }

    let newX = e.stageX
    let newY = e.stageY
    
    this._drawALine(this.current.x, this.current.y, newX, newY, this.current.color, 2)

    this.current.x = newX
    this.current.y = newY
    this.points.push([newX, newY])
  }

  _onMessage({name, data}) {
    switch (name) {
      case "bezierCurve":
        this._drawABezierCurve(data[0][0], data[0][1], data.slice(1), this.current.color)
        // code...
        break;
      
      default:
        // code...
        break;
    }
  }

  _emitMessage(name, data) {
    console.log(this)
    this.parent.event('board_sp', {name, data})
  }

  _drawALine(x0, y0, x1, y1, color = this.current.color, width = 1) {
    return this.tempContainer.graphics.drawLine(x0, y0, x1, y1, color, width)
  }

  _drawABezierCurve(x, y, beziers, lineColor, lineWidth = 1) {
    // [["moveTo",x,y],["lineTo",x,y,x,y,x,y],["arcTo",x1,y1,x2,y2,r],["closePath"]]
    beziers = beziers.map(function(points, index) {
      return ['bezierCurveTo'].concat(points.map(function(p, index) {
         return index % 2 === 0 ? p - x : p - y
      }))
    })

    this.graphics.drawPath(x, y, [['moveTo', 0, 0], ...beziers], null, {strokeStyle: lineColor, lineWidth: 2})
  }

  _simplifyLineByCurve(points = [], level = 20) {
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

    return _.flatMap(paperPath.curves, function(curve, index) {
      var curves = _.flatMap(curve.points, function(point, index) {
        return [_.round(point.x, 1), _.round(point.y, 1)]
      })

      //精简数据
      if (index === 0) {
        return [curves.slice(0, 2), curves.slice(2)]
      } else {
        return [curves.slice(2)]
      }
    })
  }
}