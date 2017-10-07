const model = {
	canvasWidth: 0,
	canvasHeight: 0,
	canvasOffset: {left: 0, top: 0},
	socketUrl: '',
}

export function relX(x) {
  return x - model.canvasOffset.left
}

export function relY(y) {
  return y - model.canvasOffset.top
}

export function ratioX(x) {
  return x / model.canvasWidth 
}

export function ratioY(y) {
	return y / model.canvasHeight
}

export function getSocketUrl() {
	return model.socketUrl
}

export function setSocketUrl(url) {
	model.socketUrl = url 
}

export function setSocketUrl(url) {
	model.socketUrl = url 
}

