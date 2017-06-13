import store from '../database/store.js'
import fs from 'fs-extra'
var bcrypt = require('bcrypt-nodejs')

const uuidV5 = require('uuid')

class KindleLogs {
  login() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const currentUser = store.get('users')[0]
    if(username == currentUser.admin.username && bcrypt.compareSync(password, currentUser.admin.password)){
      this.navigate('home')
    }else {
      console.log('wrong login details')
      alert('Wrong login details')
    }
  }

  /* Generates a unique UUID for a device based on local time */
  generateUuid() {
    const NAMESPACE = store.get('last_uuid')
    return uuidV5('kindlelogs', NAMESPACE)
  }

  lastUuid() {
    return store.get('last_uuid')
  }

  navigate (link) {
    window.location.hash = link
  }

  dirExists(dir, successMessage, failureMessage) {
    if(fs.pathExistsSync(dir)){
      console.log(successMessage)
      return true
    }
    console.log(failureMessage)
    return false
    
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
    if(this.dirExists(filePath, successMessage, failureMessage)) {
      return true
    }
    console.log(failureMessage)
    return false
  }

  writeJson(jsonFilePath, jsonObject) {
    fs.writeJsonSync(jsonFilePath, jsonObject)
  }

  details(item) {
    alert(JSON.stringify(item))
  }

  getCurrentProgram() {
    return store.get('current_program')
  }

  generateNewDeviceConfig() {
    return JSON.parse({uuid: this.generateUuid(), last_updated: new Date(), program: this.getCurrentProgram(), user_id: 'unkown'})
  }

  confirmConfig(jsonFilePath, successMessage, failureMessage) {
    var config = JSON.parse('/Volumes/Kindle/worldreader/config.json')
    console.log(config)
    /*if(config.uuid !='' && config.last_updated != '' && config.program != '' && config.user_id !='') {
      console.log(successMessage)
      return true
    }
    console.log(failureMessage)
    return true*/
  }

  onboardDevice(jsonObjct){
    store.set(
      'devices',
      store.get('devices').push(jsonObjct)
    )
  }

  getDevices() {
    return store.get('devices')
  }

}

const kindle = new KindleLogs()
export default kindle
