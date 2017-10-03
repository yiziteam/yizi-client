import Event = Laya.Event
import Sprite = Laya.Sprite
import MouseManager = Laya.MouseManager
// import Socket from '@/utils/socket'

export default class FreeDraw extends Sprite {
  private domWidth: number
  private domHeight: number
  private current: any
  private drawing: boolean

  constructor(w, h) {
    super()
    console.log('我是FreeDraw')
    this.init()

    this.domWidth = w
    this.domHeight = h
    this.current = {x: 0, y: 0, color: '#F00'}

    this.width = w
    this.height = h
    console.log(this.width);
    console.log(this.height);
  }

  private init(): void {
    console.log('我是FreeDraw init')
    // console.log(Socket.on)
    // console.log(Socket.emit)
    this.addEvents()
  }

  private addEvents(): void {
    this.on(Event.MOUSE_DOWN, this, this.onMouseDown);
    this.on(Event.MOUSE_UP, this, this.onMouseUp);
    this.on(Event.MOUSE_OUT, this, this.onMouseUp);
    this.on(Event.MOUSE_MOVE, this, this.onMouseMove);

    this.graphics.drawLine(0, 0, 200, 200, '#F00', 2)
  }

  private onMouseDown(e): void {
    this.drawing = true;
    this.current.x = MouseManager.instance.mouseX;
    this.current.y = MouseManager.instance.mouseY;
  }

  private onMouseUp(e): void {
    if (!this.drawing) {
      return;
    }
    this.drawing = false;
    this.drawALine(this.current.x, this.current.y, MouseManager.instance.mouseX, MouseManager.instance.mouseY, this.current.color, true);
  }

  private onMouseMove(e): void {
    if (!this.drawing) {
      return;
    }
    this.drawALine(this.current.x, this.current.y, MouseManager.instance.mouseX, MouseManager.instance.mouseY, this.current.color, true);
    this.current.x = e.stageX;
    this.current.y = e.stageY;
  }

  private drawALine(x0, y0, x1, y1, color, emit): void {
    // context.beginPath();
    // context.moveTo(x0, y0);
    // context.lineTo(x1, y1);
    // context.strokeStyle = color;
    // context.lineWidth = 2;
    // context.stroke();
    // context.closePath();

    this.graphics.drawLine(x0, y0, x1, y1, '#F00', 2)

    if (!emit) {
      return;
    }
    var w = this.domWidth;
    var h = this.domHeight;

    // Socket.emit('drawing', {
    //   x0: x0 / w,
    //   y0: y0 / h,
    //   x1: x1 / w,
    //   y1: y1 / h,
    //   color: '#F00'
    // });
  }

  public destroy(): void {
    this.destroy()
  }
}

