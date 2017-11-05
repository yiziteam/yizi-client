<template>
  <div id="app">
    <my-board></my-board>
  </div>
</template>

<script>
  import MyBoard from './components/MyBoard.vue'
  import MySocket from '@/common/Socket'
  import Model from '@/board/modules/model'

  export default {
    name: 'app',
    components: {
      MyBoard
    },
    methods: {
      createSocket () {
        console.log(Model)
        Model.canvasWidth = 1212

        MySocket.getInstance(Model.socketUrl)
          .on('board', (data) => {
            console.log(data)
          })
          .emit('board', JSON.stringify([12,343,343,5]))
      }
    },
    mounted () {
      this.createSocket()
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
