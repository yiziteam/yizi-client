<template>
  <div class="laya-box" id="laya-box">
  </div>
</template>
<script>
  import Board from 'Board'

  export default {
    name: 'laya',
    data () {
      return {}
    },
    mounted () {
      new Board('#laya-box')
    }
  }
</script>

<style scoped>
  #laya-box {
    position: relative;
    margin: auto;
    width: 1000px;
    height: 750px;
  }
</style>
