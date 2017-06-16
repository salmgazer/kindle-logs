<template>
  <div id="wrapper">
    <NavRegion active='Profile'></NavRegion>
      <div>
        <div id='profile-form'>
          <div>
            <span class="title">
              <h2>Update your details</h2>
            </span>
          </div>
          <div class="row col-md-6 form-element">
            <b-form-input type="text" placeholder="New username" name="username" id="username"></b-form-input>
          </div>
          <div class="row col-md-6 form-element">
            <b-form-input type="password" placeholder="Enter your current password" name="password" id="password"></b-form-input>
          </div>
          <div class="row col-md-6 form-element">
            <b-form-input type="password" placeholder="Enter your new password" name="password_new" id="password_new"></b-form-input>
          </div>
          <div class="row col-md-6 form-element">
            <b-form-input type="password" placeholder="Repeat your new password" name="password_new2" id="password_new2"></b-form-input>
          </div>
          <button class="center btn btn-success" type="button" @click="updateProfile()">Update</button><br><br>
        </div>
      </div>
      <div v-for="error in this.formErrors">
        <h4>{{ error }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import NavRegion from './NavRegion'
import user from '../../util/user.js'
var bcrypt = require('bcrypt-nodejs')

export default {
  name: 'profile',
  components: { NavRegion },
  methods: {
    updateProfile() {
      this.formErrors = []
      const newUsername = document.getElementById('username').value 
      const password = document.getElementById('password').value
      const passwordNew = document.getElementById('password_new').value
      const passwordNew2 = document.getElementById('password_new2').value
      var users = user.getUsers()
      if(passwordNew2.length < 8) 
        this.formErors.push('Password must be at least 8 characters long')
      if(passwordNew != passwordNew2)
        this.formErrors.push('New passwords do not match')
      if(this.formErrors.length == 0) {
        if(bcrypt.compareSync(password, users[0].admin.password)) {
          var hash = bcrypt.hashSync(passwordNew)
          users[0].admin.password = hash
          users[0].admin.username = newUsername
          user.updateUsers(users)
          window.location.hash = 'home'
        }
      }
    }
  },
  data: () => {
    return {
      formErrors: []
    }
  },
}
</script>

<style scoped>
  h1 {
    color: #000;
  }

  #profile-form {
    margin-left: 250px;
    margin-top: 100px;
  }

  #profile-form .form-element {
    margin-bottom: 20px;
  }
</style>

