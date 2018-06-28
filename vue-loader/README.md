# Setting up a project

使用脚手架工具 vue-cli 创建一个使用 vue-loader 的项目

### 全局安装 vue-cli

    npm install -g vue-cli

### 模板

* [webpack-simple](https://github.com/vuejs-templates/webpack-simple)

* [webpack](https://github.com/vuejs-templates/webpack)

### reference

[项目构成详解](https://juejin.im/post/5b2872516fb9a00e8626e34f)

### 创建项目

repo下的 [my-project](https://github.com/carolinezhao/Vue.js-guide-demo/tree/master/my-project) 文件夹就是使用 webpack-simple 创建的项目。

第一句的作用相当于 git clone，模板是 webpack-simple，文件夹名称是 hello-vue；

npm install 没有参数的时候，是根据项目目录下的 package.json 安装模块；

安装后生成的 package-lock.json 表示已安装的模块列表，不会再重复安装 (not sure)；

    vue init webpack-simple hello-vue
    cd hello-vue
    npm install
    
serve with hot reload at localhost

    npm run dev
  
用于生产环境，对应生成 dist 文件夹

    npm run build

### 完整项目

[eventdeer-web](https://github.com/carolinezhao/eventdeer/tree/master/web) 使用 webpack 模板