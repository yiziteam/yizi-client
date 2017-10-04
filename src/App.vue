<template>
  <div id="app">
    <my-laya></my-laya>
  </div>
</template>

<script>
  import MyLaya from '@/components/MyLaya.vue'
  import MySocket from '@/utils/Socket'
  import Model from '@/board/Model'

  export default {
    name: 'app',
    components: {
      MyLaya
    },
    methods: {
      createSocket () {
        Model.socketUrl = 'http://localhost:3000/'

        MySocket.instance(Model.socketUrl)
          .on('board', (data) => {
            console.log(data)
          })
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
