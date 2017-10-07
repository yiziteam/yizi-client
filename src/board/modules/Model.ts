export default class Model {
	public static canvasWidth: number
  	public static canvasHeight: number
  	public static canvasOffset: any
  	public static socketUrl: string

  	//rel relative简写，相对
  	static relX(x: number): number {
      return x - Model.canvasOffset.left
    }

	static relY(y: number): number {
	  return y - Model.canvasOffset.top
	}

	static ratioX(x: number): number {
	  return x / Model.canvasWidth 
	}

	static ratioY(y: number): number {
		return y / Model.canvasHeight
	}

	static getSocketUrl(): string {
		return Model.socketUrl
	}
}