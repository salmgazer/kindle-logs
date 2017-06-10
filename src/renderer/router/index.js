import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/Login')
    },
    {
      path: '/home',
      name: 'home-page',
      component: require('@/components/HomePage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
