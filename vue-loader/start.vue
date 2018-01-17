<!-- 组件细则（很多没有看懂）
三种顶级语言块 <template>、<script> 和 <style>，还允许添加可选的自定义块。
每个.vue文件只能有1个<template>，1个<script>，可以有多个<style>。
<style> 标签可以有 scoped 或者 module 属性。

可以分隔.vue文件到多个文件中，通过 src 属性导入外部文件：
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script> -->

<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>