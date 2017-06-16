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
@import url('assets/css/font-awesome.min.css');

html, body {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 100% !important;
  min-width: 100% !important;
}
#app {
  height:100vh;
}

.not-mounted {
  color: #000;
}
.mounted {
  color: #5cb85c !important;
  border-color: #5cb85c !important;
}
#mount-area {
  margin-left: 50px;
}
.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
#mount-text {
  font-size: 0.5em;
  margin-left: 10px;
  padding-top: -10px;
}

</style>
