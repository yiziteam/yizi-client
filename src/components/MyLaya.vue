<template>
  <div class="laya-box" id="laya-box">
  </div>
</template>

<script>
// import $ from 'jquery'
import Board from 'Board'

export default {
  name: 'laya',
  data () {
    return {
      msg: 'Welcome to laya box'
    }
  },
  mounted () {
    var board = new Board('#laya-box')

    console.log(board)
    // console.log(laya)

    // var $layabox = $('#laya-box')
    // var height = $layabox.height()
    // var width = $layabox.width()

    // laya.init(height, width)

    // $layabox.append($(laya.Browser._container))

    // var txt = new laya.Text()
    // txt.text = 'Hello layabox'
    // txt.color = '#FF0000'
    // txt.fontSize = 66

    // txt.stroke = 5
    // txt.strokeColor = '#fff'
    // txt.bold = true
    // txt.pos(60, 100)

    // laya.stage.bgColor = '#23238E'

    // laya.stage.addChild(txt)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#laya-box {
	position: relative;
	margin: auto;
	width: 600px;
	height: 300px;
}
</style>