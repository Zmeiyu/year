import Vue from 'vue'
import Router from 'vue-router'
import BigScreen from '@/pages/BigScreen'
import WorkResult from '@/pages/WorkResult'
import Display from '@/pages/Display'
import InsidePage from '@/pages/InsidePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BigScreen',
      component: BigScreen
    },
    {
      path: '/WorkResult',
      name: 'WorkResult',
      component: WorkResult
    },
    {
      path: '/Display',
      name: 'Display',
      component: Display
    },
    {
      path: '/InsidePage',
      name: 'InsidePage',
      component: InsidePage
    }
  ]
})
