import Vue from 'vue'
import Router from 'vue-router' // 引入路由
import App from './App.vue'
import Board from './Board.vue' // 引入组件
import Docs from './Docs.vue' // 引入组件

Vue.use(Router) // 安装路由

const User = { // 定义组件
  template: '<div>Params: {{this.$route.params}}</div>'
}

const router = new Router({ // 路由实例
  routes: [ // routes 可以在外面先定义，再传进来
    { // 每个路由映射一个组件
      path: '/docs',
      component: Docs
    },
    {
      path: '/board',
      component: Board
    },
    { // 动态路径参数，以冒号开头，可以设置多个
      path: '/user/:username/post/:post_id',
      name: 'user',
      component: User
      // /user/docs 和 /user/board 都会映射到相同路由
      // 参数值会被设置到 this.$route.params
    }
  ]
})

// 通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// 另一种写法
// const app = new Vue({
//   router
// }).$mount('#app')
