import store from '../database/store.js'
const fsold = require('fs')
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

  /* Generates a unique UUID for a device based on last generated uuid */
  generateUuid() {
    const NAMESPACE = store.get('last_uuid')
    const newUuid = uuidV5('kindlelogs', NAMESPACE)
    store.set('last_uuid', newUuid)
    return newUuid
  }

  navigate (link) {
    window.location.hash = link
  }

  dirExists(dir, successMessage, failureMessage) {
    return fs.pathExistsSync(dir)
  }

  async dirExistsAsync(dir) {
    const pathStatus = await fs.pathExists(dir)
    return pathStatus
  }

  createDir(dir) {
    return fs.ensureDirSync(dir)
  }

  createFile(filePath) {
    fs.ensureFileSync(filePath)
    return this.dirExists(filePath)
  }

  writeJson(jsonFilePath, jsonObject) {
    fs.writeJsonSync(jsonFilePath, jsonObject)
  }

  details(item) {
    alert(JSON.stringify(item))
  }

  generateNewDeviceConfig() {
    return {uuid: this.generateUuid(), last_updated: new Date(), program: this.getCurrentProgram(), user_id: 'unkown'}
  }

  confirmConfig(jsonFilePath) {
    var config = fs.readJsonSync(jsonFilePath+'')
    return (config.uuid !='' && config.last_updated != '' && config.program != '' && config.user_id !='')
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
      var deviceConfig = fs.readJsonSync(configFile + '')
      return [true, deviceConfig]
    }
    return [false, {}]
  }

  /* TODO: write a better search function */
  searchDevice(device) {
    const devices = store.get('devices')
    if(this.search(devices, device)){
      console.log('This device is already in our records')
      return true
    }
    console.log('This device is not in our records')
    return false
  }
  
  search(devices, device) {
    for(var i = 0; i < devices.length; i++) {
      if(devices[i].uuid == device.uuid)
        return true
    }
    return false
  }

  compareDevices(deviceA, deviceB) {
    if(deviceA.uuid == deviceB.uuid){
      return 1
    }
    return -1
  }

  async filesInDir(expectedFiles){
    for(var i = 0; i < expectedFiles.length; i++) {
      const dirStatus = await this.dirExistsAsync(expectedFiles[i].dir)
      if(dirStatus){
        const allFiles = await fs.readdir(expectedFiles[i].dir)
        for (var m = 0; m < allFiles.length; m++){
          if(allFiles[m].includes(expectedFiles[i].filename)) {
            expectedFiles[i].status = fsold.lstatSync(expectedFiles[i].dir + allFiles[m]).isFile()
            expectedFiles[i].filename = allFiles[m]
          }
        }
      }
    }
    return expectedFiles
  }

  async countFilesInDir(dir) {
    const allFiles = await fs.readdir(dir)
    return allFiles.length
  }

  async copyFileOrDir(fileOrDirPath, newFileOrDirPath){
    const copyStatus = await fs.copy(fileOrDirPath, newFileOrDirPath)
    const status = await this.dirExistsAsync(newFileOrDirPath)
    return status
  }

  getExpectedFiles() {
    return store.get('expectedLogFiles')
  }

  getCurrentProgram() {
    return store.get('current_program')
  }

  updateProgram() {
    const newName = document.getElementById('program').value
    store.set('current_program', newName)
    return (store.get('current_program') == newName)
  }
  
}

const kindle = new KindleLogs()
export default kindle
