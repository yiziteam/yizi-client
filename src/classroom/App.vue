<template>
  <div id="app">
    <my-laya></my-laya>
  </div>
</template>

<script>
  import MyLaya from './components/MyLaya.vue'
  import MySocket from '../common/Socket'
  // import Model from './board/Model.ts'

  export default {
    name: 'app',
    components: {
      MyLaya
    },
    methods: {
      createSocket () {
        console.log(Model)
        // Model.socketUrl = 'http://localhost:3000/'

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
