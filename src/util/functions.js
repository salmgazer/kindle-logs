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
    if(fs.pathExistsSync(dir) == true){
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
    return {uuid: this.generateUuid(), last_updated: new Date(), program: this.getCurrentProgram(), user_id: 'unkown'}
  }

  confirmConfig(jsonFilePath, successMessage, failureMessage) {
    var config = fs.readJsonSync(jsonFilePath+'')
    if(config.uuid !='' && config.last_updated != '' && config.program != '' && config.user_id !='') {
      console.log(successMessage)
      return true
    }
    console.log(failureMessage)
    return true
  }

  onboardDevice(jsonObject){
    var devices = store.get('devices')
    devices.push(jsonObject)
    console.log('Onboarding...')
    store.set('devices', devices)
  }

  getJsonFromFile(jsonFilePath) {
    return fs.readJsonSync(jsonFilePath+'')
  }

  getDevices() {
    return store.get('devices')
  }

  getDeviceConfig(configFile) {
    // load config
    if(this.dirExists(configFile)) {
      console.log('config exits ==== >>>>')
      var deviceConfig = fs.readJsonSync(configFile + '')
      return [true, deviceConfig]
    }
    console.log('Device has been dismounted')
    return [false, {}]
  }

  searchDevice(device) {
    const devices = store.get('devices')
    if(this.binarySearch(devices, device, this.compareDevices) != -1){
      console.log('This device is already in our records')
      return true
    }
    console.log('This device is not in our records')
    return false
  }
  
  binarySearch(devices, device, compareFunc) {
    var m = 0
    var n = devices.length - 1
    while (m <= n) {
        var k = (n + m) >> 1
        var cmp = compareFunc(device, devices[k]);
        if (cmp > 0) {
            m = k + 1;
        } else if(cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
  }

  compareDevices(deviceA, deviceB) {
    if(deviceA.uuid == deviceB.uuid){
      return 1
    }
    return -1
  }
}

const kindle = new KindleLogs()
export default kindle
