<template>
  <div id="app">
    <my-laya></my-laya>
  </div>
</template>

<script>
  import MyLaya from '@/components/MyLaya.vue'

  export default {
    name: 'app',
    components: {
      MyLaya
    },
    methods: {
      createSocket () {

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
