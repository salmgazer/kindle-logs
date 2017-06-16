<template>
  <div id="wrapper">
    <span>{{ this.checkMountStatus() }}</span>
    <NavRegion active='Devices'></NavRegion> 
      <div id='check-area' class="row">
        <MountArea v-bind:mount-status="this.mountStatus"/>
        <div v-if="this.mountStatus == true" class="col-md-4">
          <div v-if="this.createdFolder == true">
            <p>Registered</p>
          </div>
          <div v-else>
            <p>Not Registered</p>
          </div>
        </div>
      </div>
      <div class="row" id="log-area">
        <button v-if="this.configStatus && this.mountStatus" class="btn btn-outline-primary col-md-2" @click='readLogs()'>Read Logs</button>
        <div class="row col-md-8" style="margin-left: 100px; float: right">
          <input  class="form-control col-md-5" id="program" name="program" v-model="this.program" />
          <button class="btn btn-primary" @click="updateProgram()">Update program</button>
        </div>
      </div>

      <!-- List devices -->
      <div class="justify-content-centermy-1 row">
        <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
          <b-form-select :options="[{text:5,value:5},{text:10,value:10}]" v-model="perPage">
          </b-form-select>
        </b-form-fieldset>

        <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
          <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
        </b-form-fieldset>
      </div>

      <!-- Main table element -->
      <b-table striped hover :items="devices" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
        <template slot="name" scope="item">
          {{item.item.user_id}}
        </template>
        <template slot="program" scope="item">
          {{item.item.program}}
        </template>
        <template slot="actions" scope="item">
          <b-btn size="sm" @click="details(item.item)">Details</b-btn>
        </template>
      </b-table>

      <div class="justify-content-center row my-1">
        <b-pagination size="md" :total-rows="this.devices.length" :per-page="perPage" v-model="currentPage" />
      </div>
      <div style="width: 40%; height: 100px; margin-top: 10px; float: left;">
        <label style="color: red;">Console</label>
        <p>{{ this.messages }}</p>
      </div>
      <div id="bottom-right" v-if="this.mountStatus">
        <!--<button class="btn btn-outline-success col-md-3" @click='setUpNewDevice()'>Set Up New Device</button>-->
        <i class="fa fa-4x fa-plus-circle" id="setup-button" aria-hidden="true" @click='setUpNewDevice()'></i>
      </div>
  </div>
</template>

<script>
  import NavRegion from './NavRegion'
  import MountArea from './common/MountArea'
  import kindle from '../../util/functions.js'

  let baseDir        = '/Volumes/Kindle/'
  let worldreaderDir = 'worldreader/'
  let localLogs      = 'kindlelogs/'
  let configFile     = baseDir + worldreaderDir + 'config.json'

  export default {
    name: 'devices',
    components: { NavRegion, MountArea },
    data: function() {
      return {
        mountStatus: false,
        createdFolder: false,
        configStatus:false,
        messages: '',
        program: kindle.getCurrentProgram(),
        devices: kindle.getDevices(),
        fields: {
          name: {
            label: 'Device ID',
            sortable: true
          },
          uuid: {
            label: 'UUID',
            sortable: true
          },
          program: {
            label: 'Program'
          },
          last_updated: {
            label: 'Last Updated'
          },
          actions: {
            label: 'Actions'
          }
        },
        currentPage: 1,
        perPage: 5,
        filter: null
        }
      },
    methods: {
      async readLogsAsync() {
        var expectedFiles = kindle.getExpectedFiles()
        const foundLogs = await kindle.filesInDir(expectedFiles)
        console.log(foundLogs)
        //get device config
        var config = kindle.getDeviceConfig(configFile)
        console.log(config[1].uuid)
        if(config[0] == true){
          var existingLogsCount = await kindle.countFilesInDir(localLogs + config[1].uuid)
          console.log(existingLogsCount)
          for(var i = 0; i < foundLogs.length; i++) {
            if(foundLogs[i].status == true){
              existingLogsCount += 1
              const tryCopy = await kindle.copyFileOrDir(foundLogs[i].dir + foundLogs[i].filename, localLogs + config[1].uuid + '/log' + existingLogsCount)
              if(tryCopy) {
                this.messages += 'Successfully copied log : '+ foundLogs[i].filename
                config[1].last_updated = new Date()
                kindle.writeJson(configFile, config[1])
              }else {
                this.messages += 'Failed to copy log : ' + foundLogs[i].filename
              }
            }
          }
        }else {
          console.log('Could not load device config')
        } 
      },
      checkMountStatus() {
        setInterval(async() => {
          const pathStatus = await kindle.dirExistsAsync(baseDir)
          //console.log(pathStatus)
          this.mountStatus = pathStatus
          if(pathStatus == false)
            this.configStatus = pathStatus
        }, 1000) 
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      details(device) {
        kindle.details(device)
      },
      navigate (link) {
        kindle.navigate(link)
      },
      async checker() {
        console.log(await kindle.dirExistsAsync(baseDir))
      },
      setUpNewDevice () {
        this.messages = ''
        if(kindle.dirExists(baseDir, 'Device is mounted', 'Device has not been mounted')){
            this.mountStatus = true
          //check if config file exists
          if(kindle.dirExists(configFile, 'Config file already exists', 'Config file does not exist')) {
              this.configStatus  = true
              this.createdFolder = true
              // load config file as json and confirm configuration
              if(kindle.confirmConfig(configFile)){
                this.messages += '* Confile file is great'
                var device = kindle.getJsonFromFile(configFile +'')
                if(kindle.searchDevice(device)){
                }else {
                  kindle.onboardDevice(kindle.getJsonFromFile(configFile+''))
                  this.devices = kindle.getDevices()
                }
              } else {
                this.messages += '* Failed to register device'
                kindle.writeJson(configFile, kindle.generateNewDeviceConfig())
                if(kindle.confirmConfig(configFile)){
                  this.messages += '* Successfully registered this device'
                  kindle.onboardDevice(kindle.getJsonFromFile(configFile+''))
                  this.devices = kindle.getDevices()
                }
              }
          } else {
            // config does not exists, create new one
            if(kindle.createFile(configFile)){
              this.messages += '* Successfully created config file'
              this.configStatus  = true
              this.createdFolder = true
              // write to config file
              kindle.writeJson(configFile, kindle.generateNewDeviceConfig())
              if(kindle.confirmConfig(configFile)){
                this.messages += 'Successfully registered this device'
                var configJson = kindle.getJsonFromFile(configFile +'') /* @TODO to be removed */
                kindle.onboardDevice(configJson)
                this.devices =kindle.getDevices()
              }else {
                this.messages += '* Failed to register this device'
                this.configStatus = false
              }
            }else { 
              this.configStatus =false
              this.messages += '* Could not create config file, try later'
             }
            }
          }else{
            this.baseState()
        }
      },
      readLogs() {
        console.log('About to read logs')
        var config = kindle.getDeviceConfig(configFile + '')
        if(config[0]){
          console.log('lets create some directories')
          console.log(config[1].uuid)
          // check if localFolder exists
          if(kindle.dirExists((localLogs + config[1].uuid + '/'), 'Local logs folder for this device exists',
            'There is no local logs folder for this device') == true) {
              // go ahead to read new logs
              this.readLogsAsync()
            } else {
              // create new local logs folder for device
              if(kindle.createDir(localLogs + config[1].uuid + '/', 'Successfully created local logs folder', 'Could not create local logs folder' )) {
                //now read logs into the new folder
                this.readLogsAsync()
              } else {
                console.log('Could not create local log folder, try again later')
              }
            }
        } else {
          console.log('The device has been dismoutned')
        }
      },
      updateProgram(){
        if(kindle.updateProgram()){
          this.program = kindle.getCurrentProgram()
          this.messages += '  Successfully updated program name'
        }
      },
      baseState() {
        this.mountStatus   = false
        this.createdFolder = false
        this.configStatus  = false
      },
    }
  }
</script>

<style>
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

  main {
    display: flex;
    justify-content: space-between;
  }

  #check-area, #log-area  {
    margin-top: 30px;
    margin-bottom: 30px;
    width: 90%;
  }

  #check-area button, #log-area button {
    margin-left: 15px;
  }

  #check-area p {
    text-align: center;
  }
  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }
  #setup-button {
    color: #05f;
    margin-right: 40px;
    margin-top: 50px;
  }
  #setup-button:hover {
    color: #0af;
    cursor: pointer;
    cursor: hand;
  }
  #bottom-right {
    float: right;
    bottom: 0;
  }

</style>
