<template>
  <div>
    <div class="doc">
      <div>
        <form id="login-form" onsubmit="login()">
          <div>
            <img id="logo" src="~@/assets/logo_wr.png">
            <span class="title">
              Collect logs on readers' activities
            </span>
          </div>
          <div>
            <input type="text" id="username" name="username" placeholder="username" />
          </div>
          <div>
            <input type="password" id="password" name="password" placeholder="password" />
          </div>
          <button class="center" @click="login()">Login</button><br><br>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'landing-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      login () {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        if (username === 'salifu' && password === 'world123') {
          this.navigate('home')
        } else {
          alert('Wrong details')
        }
      },
      navigate (link) {
        window.location.hash = link
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  .row {
    display: block;
  }

  .centered {
    margin: 0 auto;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
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
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 150px;
    display: block;
    margin: 0 auto;
    margin-top: 150px;
  }

  #login-form {
    margin: 0 auto;
    text-align: center;
  }

  button {
    text-align: center;
    margin: 0 auto;
  }

  #login-form input {
    width: 30%;
    height: 40px;
    margin-bottom: 40px;
    border: 1px solid #4fc08d;
    padding-left: 10px;
    font-size: 1.4em;
    border-radius: 2em;
    padding: 0.75em 2em;
  }

  main {
    margin: 0 auto;
  }


  .left-side {
    display: flex;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 1.6em;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 15px;
    display: block;
    text-align: center;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: 1.4em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
    border-radius: 2em;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
