import store from '../database/store.js'
import fs from 'fs-extra'

class KindleLogs {
  login() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const currentUser = store.get('users')[0]
    if(username == currentUser.admin.username && password == currentUser.admin.password){
      this.navigate('home')
    }else {
      console.log('wrong login details')
      alert('Wrong login details')
    }
  }

  navigate (link) {
    window.location.hash = link
  }

  dirExists(dir, successMessage, failureMessage) {
    if(fs.pathExistsSync(dir)){
      console.log(successMessage)
      return true
    }else{
      console.log(failureMessage)
      return false
    }
  }

  createDir(dir, successMessage, failureMessage) {
    if(fs.ensureDirSync(dir)){
      console.log(successMessage)
      return true
    }
    console.log(failureMessage)
    return false
  }

  createFile(filePath, successMessage, failureMessage) {
    fs.ensureFileSync(filePath)
    if(this.dirExists(filePath, successMessage, failureMessage)){
      return true
    }
    console.log(failureMessage)
    return false
  }

  details(item) {
    alert(JSON.stringify(item))
  }
}

const kindle = new KindleLogs()
export default kindle
