import store from '../database/store.js'
var bcrypt = require('bcrypt-nodejs')

class User {
  
  getCurrentUser() {
    return store.get('users')[0]
  }

  getUsers() {
    return store.get('users')
  }

  updatePassword (newUsers) {
    store.set('users', newUsers)
  }

}

const user = new User()
export default user