
#### 渲染函数

src/vue-render.js

#### JSX

src/vue-render.js --> lib/vue-render.js

_与本项目相关的步骤从 6 开始。1-5 为首次使用 Babel 的安装步骤。_

[使用 Babel](https://babeljs.cn/docs/setup#installation)

1.在要使用的文件目录下创建 package.json 

2.安装 Babel CLI (安装后会写入 package.json）

    npm install --save-dev babel-cli
    
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
