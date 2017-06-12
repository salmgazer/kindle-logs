<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: 'kindle-logs'
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

html, body {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 100% !important;
  min-width: 100% !important;
}
#app {
  height:100vh;
}
</style>
