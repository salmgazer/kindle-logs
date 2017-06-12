<template>
  <div id="wrapper">
    <NavRegion active='Home'></NavRegion>
      <h1 style="text-align: center; margin-top: 100px;">Dashboard of Device logs</h1>
      </div>
  </div>
</template>

<script>
  import NavRegion from './NavRegion'
  import fs from 'fs-extra'

  export default {
    name: 'home-page',
    components: { NavRegion },
    data: function() {
      return {
        mountStatus: false,
        createdFolder: false
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      navigate (link) {
        window.location.hash = link
      },
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

</style>
