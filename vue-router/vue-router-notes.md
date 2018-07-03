## 基础

注册和定义路由 --> ../my-project/src/main.js

`<router-link> 相关用法` --> ../my-project/src/App.vue

路径 '/' 必须有 exact，否则永远是 active 状态
```js
<router-link to="/" exact>
```

命名路由
```js
// 路由配置
routes: [
  {
    path: '/user/:userId',
    name: 'user',
    component: User
  }
```
```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```
```js
// 函数中
router.push({ name: 'user', params: { userId: 123 }})
```

命名视图：同级展示多个视图
```js
// 路由配置
routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
```
同一路由对应多个组件，分别渲染到对应 name 的视图中。
```html
<router-view ></router-view>
<router-view name="a"></router-view>
<router-view name="b"></router-view>
```

## 路由对象 route object

```js
{
    path: '', // 绝对路径
    params: {}, // 路由参数
    query: {}, // 查询参数
    hash: '', // 当前路由的 hash 值 (带#)
    fullpath: '', // 完成解析后的 URL，包含查询参数和 hash 的完整路径？
    matched: [], // 包含当前路由的所有嵌套路径片段的路由记录
    name: '', // 路由名称，若无则为 null
    redirectedFrom: '', // 重定向来源的路由的名字
    meta: {} // 路由元信息
}
```

## 导航守卫：控制路由的跳转行为

全局前置守卫
```js
const router = new VueRouter({
  routes: []
})
router.beforeEach((to, from, next) => {})
```
- `to` 要进入的路由对象
- `from` 要离开的路由对象
- `next` function 执行结果。必须有，否则页面不渲染。
    - `next()` 默认跳转
    - `next(false)` 保持当前路由不跳转
    - `next('path')` 或 `next({})` 指定路由跳转。不能直接写在全局中，否则会陷入无限循环。

路由独享守卫 (参数同上)
```js
routes: [
  {
    path: '/foo',
    component: Foo,
    beforeEnter: (to, from, next) => {}
  }
]
```

组件内守卫
```js
const Foo = {
  template: ``,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用。
    // 组件实例还没被创建，因此不能获取组件实例 `this`。
    // 可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
    next(vm => {
       // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用，比如嵌套路由。
    // 组件实例已被创建，可以访问组件实例 `this`。
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用。可以访问组件实例 `this`。
    // 通常用来禁止用户在还未保存修改前突然离开。
    const answer = window.confirm('...')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
```

## 路由元信息 meta

routes 配置中的每个路由对象为路由记录。路由记录可以是嵌套的，因此，当一个路由匹配成功后，可能匹配多个路由记录。<br>
一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。<br>
因此，需要遍历 $route.matched 来检查路由记录中的 meta 字段。

```js
//  在全局导航守卫中检查元字段
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## reference

- Vue Router 指南
- Vue Router API
- https://segmentfault.com/a/1190000009425705