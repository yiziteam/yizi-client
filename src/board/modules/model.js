
var model = {
	canvasWidth: 0,
	canvasHeight: 0,
	canvasOffset: {},
	socketUrl: '',
  	//rel relative简写，相对
  	relX: function(x = 0) {
      return x - this.canvasOffset.left
    },

	relY: function(y = 0) {
	  return y - this.canvasOffset.top
	},

	ratioX: function(x = 0) {
	  return x / this.canvasWidth 
	},

	ratioY: function(y = 0) {
		return y / this.canvasHeight
	},

	getSocketUrl: function() {
		return this.socketUrl
	}
}

export default model