import Vue from 'vue'
import Router from 'vue-router'
import BigScreen from '@/pages/BigScreen'
import Workflow from '@/pages/Workflow'
import Display from '@/pages/Display'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BigScreen',
      component: BigScreen
    },
    {
      path: '/Workflow',
      name: 'Workflow',
      component: Workflow
    },
    {
      path: '/Display',
      name: 'Display',
      component: Display
    }
  ]
})
