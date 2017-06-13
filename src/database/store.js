var store = require('storejs')

if(store.get('users')){
  console.log('Users already exist')
}
else {
  store.set('users', [
    {
      admin: {
        username: 'admin',
        password: 'admin'
      }
    }
  ])
}

module.exports = store