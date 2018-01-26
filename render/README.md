
## 渲染函数

* 虚拟 DOM
* createElement 参数
* 还没看：使用 JavaScript 代替模板功能

以上内容 --> [doc](https://github.com/carolinezhao/Vue.js-guide-demo/tree/master/render/doc)


## JSX

src/vue-render-jsx.js --> lib/vue-render-jsx.js

_与本项目相关的步骤从 6 开始。1-5 为首次 [使用 Babel 的步骤](https://babeljs.cn/docs/setup#installation)。_

1.在要使用的文件目录下创建 package.json
 
    npm init --yes
    
This method will generate a default package.json.

2.安装 Babel CLI

    npm install --save-dev babel-cli
    
安装后会写入 package.json，同时生成 package-lock.json
    
3.把指令放在本地版本的 npm 脚本中，而不是直接通过命令行来运行 Babel。（不理解）

在 package.json 的 `scripts` 属性中添加 babel 命令。

    "scripts": {
      "build": "babel src -d lib"
    },

4.创建 .babelrc 文件。该文件不可见，通过 `ls -a` 查看。

5.安装插件：转换 ES2015+ 的 env preset 。

    npm install babel-preset-env --save-dev


6.安装插件：[Babel 插件 for JSX](https://github.com/vuejs/babel-plugin-transform-vue-jsx)

    npm install\
      babel-plugin-syntax-jsx\
      babel-plugin-transform-vue-jsx\
      babel-helper-vue-jsx-merge-props\
      babel-preset-env\
      --save-dev

7.为了让以上两个插件生效，需要在 .babelrc 写入：

	{
  		"presets": ["env"],
  		"plugins": ["transform-vue-jsx"]
	}

8.原始文件要放在 src 目录中，build 后输出在 lib 目录下。

    npm run build

注意！html 中引入的 js 应该是 lib 目录下的。

***

Q：以上安装的所有东西都在 `~` 目录下的 `node_modules` 目录中。build 后操作目录下也会出现一个 `node_module`，两者区别是？

A：如果项目目录内没有 package.json，则会自动安装到 `~` 目录下，build 后自动生成的 `node_module` 中没有要安装的插件，同时 package.json 中的 "devDependencies" 没有这些插件的名称。虽然可以运行，但使用的仍是 `~` 目录下的插件。

正确的操作方法是，在项目目录内先创建 package.json，然后再进行安装。每个项目使用自己的依赖管理。