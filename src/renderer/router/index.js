import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

Vue.use(Router)
Vue.use(BootstrapVue)

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
      path: '/devices',
      name: 'devices',
      component: require('@/components/Devices')
    },
    {
      path: '/config',
      name: 'config',
      component: require('@/components/Config')
    },
    {
      path: '/Profile',
      name: 'profile',
      component: require('@/components/Profile')
    },
    {
      path: '/Documentation',
      name: 'documentation',
      component: require('@/components/Documentation/Index')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
