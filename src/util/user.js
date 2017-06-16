/* TODO: Push more user management code here instead of within view */
import store from '../database/store.js'
var bcrypt = require('bcrypt-nodejs')

class User {
  
  getCurrentUser() {
    return store.get('users')[0]
  }

  getUsers() {
    return store.get('users')
  }

  updateUsers (newUsers) {
    store.set('users', newUsers)
  }

}

const user = new User()
export default user