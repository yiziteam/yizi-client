<template>
  <div id="app">
    <my-laya></my-laya>
  </div>
</template>

<script>
  import MyLaya from '@/components/MyLaya.vue'
  import sokcketIo from 'socket.io-client'

  export default {
    name: 'app',
    components: {
      MyLaya
    },
    methods: {
      createSocket () {
        var socket = sokcketIo('http://localhost:3000')

        socket.on('board', (data) => {
          console.log(data)
        })

        socket.emit('board', 'xiaohu')
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
