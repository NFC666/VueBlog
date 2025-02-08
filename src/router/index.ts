/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import index from '@/pages/index.vue'
import DashBorad from '@/pages/DashBoard.vue'
import DashBoradTest from '@/components/DashBoradTest.vue'
import Essays from '../components/Essays.vue'
import EssayEditor from '@/components/EssayEditor.vue'
import EssayDetail from "../pages/EssayDetail.vue"
import { components } from 'vuetify/dist/vuetify-labs.js'
import EssayReEditor from '@/pages/EssayReEditor.vue'
import HomePage from '@/components/HomePage.vue'
import UserAdminstration from '@/components/UserAdminstration.vue'
import UserRegister from '@/components/Users/UserRegister.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:"/Login",
      component:Login
    },
    {
      path:'/',
      component:index,
      children:[
        {
          path:"HomePage",
          component:HomePage
        },
        {
          path:"/EssayDetailHomePage/:name",
          name:"EssayDetailHomePage",
          component:EssayDetail
        },
      ]
    },
    {
      path:"/DashBorad",
      component:DashBorad,
      children:[
        {
          path: 'Test', 
          component: DashBoradTest,
        },
        {
          path:"Eassy",
          component: Essays
        },
        {
          path:"EssayEditor",
          component:EssayEditor
        },
        {
          path:"/EssayDetail/:name",
          name:"EssayDetail",
          component:EssayDetail
        },
        {
          path:"/EssayReEditor/:name",
          name:"EssayReEditor",
          component:EssayReEditor
        },
        {
          path:"UserAdminstration",
          component:UserAdminstration
        },
        {
          path:"UserRegister",
          component:UserRegister
        }
      ]
    },
    // {
    //   path:"/EssayDetail/:name",
    //   name:"EssayDetail",
    //   component:EssayDetail
    // },
    // {
    //   path:"/EssayReEditor/:name",
    //   name:"EssayReEditor",
    //   component:EssayReEditor
    // }
  ]
})


export default router
