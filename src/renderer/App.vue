<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
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
