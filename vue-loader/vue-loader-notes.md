# Vue Loader Notes

[Vue Loader Docs](https://vue-loader.vuejs.org/)

## 单文件组件

[Vue 单文件组件 (SFC) 规范](https://vue-loader.vuejs.org/zh/spec.html)

三种顶级语言块 `<template>`、`<script>` 和 `<style>`，还允许添加可选的自定义块。

每个 .vue 文件只能有1个 `<template>`，1个 `<script>`，可以有多个 `<style>`。

脚本 `<script>`
- 默认导出应该是一个 Vue.js 的[组件选项对象](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E6%95%B0%E6%8D%AE)。？？

样式 `<style>`
- 可以有 scoped 或者 module 属性。
- 支持使用非默认语言，比如 CSS 预处理器，设置语言块的 lang 属性。

可以分隔 .vue 文件到多个文件中，通过 src 属性导入外部文件。<br>
相对路径需要以 ./ 开始。
```js
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

## 资源路径

URL 转换
- `.` 相对的模块依赖
- `~` 模块依赖，引用 Node 依赖中的资源
- `@` vue-cli 默认配置指向 `/src`

.png 等
- vue-cli 配置好了 file-loader 和 url-loader

## 预处理器

需要手动安装和配置

## Scoped CSS

当 p { color: red } 是 scoped 时 (即与特性选择器组合使用时) 会慢很多倍。<br>
如果使用 class 或者 id 取而代之，比如 .example { color: red }，性能影响就会消除。

## CSS Modules

还没用到

## Hot Reload

保留状态，无需刷新页面