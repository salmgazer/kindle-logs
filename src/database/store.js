var store = require('storejs')
const uuidV1 = require('uuid/v1')
const bcrypt = require('bcrypt-nodejs')

if(store.get('users')){
  console.log('Users already exist')
}
else {
  store.set('last_uuid', uuidV1())
  store.set('users', [
    {
      admin: {
        username: 'admin',
        password: '$2a$10$1RMavF693TR1SKG0abxEa.wuUpXdd8/YeyRk93.HdGl1snvPnDcci'
      }
    }
  ])
}

if(store.get('current_program')) {
  console.log(store.get('current_program') + ' is the current program')
}else{
  store.set('current_program', 'unknown')
}

if(store.get('devices')) {
  console.log('There is an existing collection of devices')
} else {
  store.set('devices', [])
}

module.exports = store