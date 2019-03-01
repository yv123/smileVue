import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Good from '@/components/pages/Good'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import { Button,Row, Col,NavBar ,Field} from 'vant';
Vue.use(Row).use(Col).use(Button).use(NavBar).use(Field);
Vue.use(Router)
export default new Router({
  routes: [
        {
            path:'/main',
            component:Main,
            children:[
              {
                path: '/',
                name: 'ShoppingMall',
                component: ShoppingMall
              },
              
              {
                path:'/categoryList',
                name:'CategoryList',
                component:CategoryList
          
              },{
                path:'/cart',
                name:'Cart',
                component:Cart
              }
            ]
        },
       {
          path: '/register',
          name: 'Register',
          component: Register
        },
        {
          path:'/login',
          name:'Login',
          component:Login
          
        },
        {
          path:'/good',
          name:'Goods',
          component:Good
        }
  ]
})
