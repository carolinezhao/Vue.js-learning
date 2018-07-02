<template>
  <div id="app">
    <!-- router-link 用于导航，渲染为 a 标签，to 指定链接 -->
    <router-link to="/docs" class="nav">Docs-1</router-link>
    <router-link to="/board" class="nav">Board-1</router-link>
    <!-- /是绝对路径；没有/，为相对路径，会在已有路径后面加上 to 的内容 -->

    <!-- 设置 tag 属性可以渲染为其他标签 -->
    <!-- <a> 将作为真实的链接，而 "激活时的CSS类名" 则设置到外层的 <li> -->
    <router-link tag="li" to="/board" class="nav">
      <a>Board-2</a>
    </router-link>

    <!-- bind js 表达式，可以带参数 -->
    <!-- 命名的路由 name 和 params 搭配使用 -->
    <!-- 结果为 /user/caroline/post/123?plan=private -->
    <router-link :to="{name: 'user', params: {username: 'caroline', post_id: 123}, query: {plan: 'private'}}" class="nav">User-1</router-link>
    <!-- path 和 直接写在 to 中 效果相同 -->
    <router-link :to="{path: '/docs', params: {username: 'rabbit'}}" class="nav">Docs-2</router-link>

    <button v-on:click="goBack">Go Back</button>
    <div>{{params}}</div>

    <div class="component">
      <!-- 路由出口，匹配到的组件渲染在这里 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    params () {
      // this.$route 访问当前路由
      return this.$route.params
    }
  },
  methods: {
    goBack () {
      // this.$router 访问路由器
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.component {
  border: 1px solid #42b983;
}

.nav {
  font-size: 20px;
  text-decoration: none;
}

.router-link-active {
  /* 激活路由时自动添加 */
  background-color: #2c3e50;
  color: #fff;
}
</style>
