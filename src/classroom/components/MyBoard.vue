<template>
  <div class="board-box" id="board-box">
      <iframe src="./board.html" id="board" frameborder="0"></iframe>
  </div>
</template>
<script>
  export default {
    name: 'board',
    data () {
      return {}
    }
  }
</script>

<style scoped>
  #board-box {
    position: relative;
    margin: auto;
    width: 1000px;
    height: 750px;
  }

  #board {
    width: 100%;
    height: 100%;
  }
</style>
