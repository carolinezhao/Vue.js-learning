// 按照官方文档示例练习，实际项目中应只有一个Root。

// 声明式渲染 Declarative Rendering

// 文本插值
// The data and the DOM are now linked, and everything is now reactive.
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!'
    }
})

// 绑定元素特性
var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date().toLocaleString(),
        msg: 'This title comes from Vue'
    }
})


// 条件与循环 Conditionals and Loops
var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: false
    }
})
app3.seen = true;

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [{
            text: 'Learn JavaScript'
        }, {
            text: 'Learn Vue.js'
        }, {
            text: 'Build something awesome'
        }]
    }
})
app4.todos.push({
    text: 'New item'
});


// 处理用户输入 Handling User Input
var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello JavaScript!'
    }
})


// 组件化应用构建 Composing with Components
// Vue 组件重要功能：跨组件数据流，自定义事件通信，构建工具集成

// 定义名为 todo-item 的新组件，在 html 中就是标签
Vue.component('todo-item', {
    // "prop"，类似于一个自定义特性，名为 todo。子单元通过 prop 接口与父单元进行了良好的解耦。
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [{
            id: 0,
            text: 'Vegetables'
        }, {
            id: 1,
            text: 'Meat'
        }, {
            id: 2,
            text: 'Coffee'
        }]
    }
})