<template>
  <div id="wrapper">
    <NavRegion active='Devices'></NavRegion>
      <div id='check-area' class="row">
        <button class="btn btn-outline-success col-md-3" @click='setUpNewDevice()'>Set Up New Device</button>
        <div class="col-md-4">
          <div v-if="this.mountStatus == true">
            <p>Mounted</p>
          </div>
          <div v-else>
            <p>Not mounted</p>
          </div>
        </div>
        <div class="col-md-4">
          <div v-if="this.createdFolder == true">
            <p>Created worldreader folder</p>
          </div>
          <div v-else>
            <p>Did not create worldreader folder</p>
          </div>
        </div>
      </div>
      <!-- List devices -->
      <div class="justify-content-centermy-1 row">
        <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
          <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
          </b-form-select>
        </b-form-fieldset>

        <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
          <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
        </b-form-fieldset>
      </div>

      <!-- Main table element -->
      <b-table striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
        <template slot="name" scope="item">
          {{item.item.program}}
        </template>
        <template slot="program" scope="item">
          {{item.item.user_id}}
        </template>
        <template slot="actions" scope="item">
          <b-btn size="sm" @click="details(item.item)">Details</b-btn>
        </template>
      </b-table>

      <div class="justify-content-center row my-1">
        <b-pagination size="md" :total-rows="this.items.length" :per-page="perPage" v-model="currentPage" />
      </div>
  </div>
</template>

<script>
  import NavRegion from './NavRegion'
  import fs from 'fs-extra'

  let baseDir = '/Volumes/Kindle/'
  let worldreaderDir = 'worldreader/'
  let configFile = 'config.html'

  export default {
    name: 'devices',
    components: { NavRegion },
    data: function() {
      return {
        mountStatus: false,
        createdFolder: false,
        configStatus:false,
        items: [
          { 
            user_id: 'POP235',
            program: 'Pencils of Promise',
            uuid: '31498310-34342n-23232-23232',
            last_updated: '12-06-2017'
          },
          { 
            user_id: 'POP235',
            program: 'Pencils of Promise',
            uuid: '31498310-34342n-23232-23232',
            last_updated: '12-06-2017'
          },
          { 
            user_id: 'LEAP235',
            program: 'LEAP',
            uuid: '31498310-34342n-23232-23232',
            last_updated: '12-06-2017'
          },
          { 
            user_id: 'Nima235',
            program: 'Mamobi Library',
            uuid: '31498310-34342n-23232-23232',
            last_updated: '12-06-2017'
          },
          { 
            user_id: 'Nima235',
            program: 'Mamobi Library',
            uuid: '31498310-34342n-23232-23232',
            last_updated: '12-06-2017'
          },
          { 
            user_id: 'Nima205',
            program: 'Mamobi Library',
            uuid: '31498310-34342n-23232-23232',
            last_updated: '12-06-2017'
          },
        ],
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
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      details(item) {
        alert(JSON.stringify(item))
      },
      navigate (link) {
        window.location.hash = link
      },
      mountStatus () {

      },
      setUpNewDevice () {
        // check if device is mounted
        if(this.dirExists(baseDir, 'Device is mounted', 'Device has not been mounted') === true){
          this.mountStatus = true
          //check if worldreader folder exists
          if(this.dirExists((baseDir + worldreaderDir), 'Worldreader folder exists on device', 'Worldreader folder does not exist') == true) {
            this.createdFolder = true
            // check if config exits
            if(this.dirExists((baseDir + worldreaderDir + configFile), 'Config file already exists', 'Config file does not exist') == true) {
              this.configStatus = true
            } else {
              // config does not exists
              if(this.createFile((baseDir + worldreaderDir + configFile), 'Successfully created config file', 'Could not create config file')){
                this.configStatus = true
              }else {
                this.configStatus =false
                this.setUpNewDevice()
              }
            }
          } else {
            // no worldreader dir
            if(this.createDir((baseDir + worldreaderDir), 'Worldreader folder created successfully', 'Could not create worldreader folder')){
              this.createdFolder = true
              this.setUpNewDevice()
            } else {
              this.createdFolder =false
              console.log('Kindle device is not properly connected to this computer')
            }
          }
        } else {
          // not mounted
          console.log('not mounted')
          this.baseState()
        }
      },
      baseState() {
        this.mountStatus =false
        this.createdFolder =false
        this.configStatus =false
      },
      dirExists (dir, successMessage, failureMessage) {
        if(fs.pathExistsSync(dir)){
          console.log(successMessage)
          return true
        }else{
          console.log(failureMessage)
          return false
        }
      },
      createDir(dir, successMessage, failureMessage) {
        if(fs.ensureDirSync(dir)){
          console.log(successMessage)
          return true
        }
        console.log(failureMessage)
        return false
      },
      createFile(filePath, successMessage, failureMessage) {
        fs.ensureFileSync(filePath)
        if(this.dirExists(filePath, successMessage, failureMessage)){
          return true
        }
        console.log(failureMessage)
        return false
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

  main {
    display: flex;
    justify-content: space-between;
  }

  #check-area  {
    margin-top: 30px;
    margin-bottom: 30px;
    width: 90%;
  }

  #check-area button {
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

</style>
