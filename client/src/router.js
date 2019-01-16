'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/views/index'
import Page1 from '@/views/page1'
import Page2 from '@/views/page2'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },{
      path: '/page1',
      component: Page1
    },{
      path: '/page2',
      component: Page2
    },
  ]
})

export default router
 
