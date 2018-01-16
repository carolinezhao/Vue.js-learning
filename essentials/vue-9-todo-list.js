// 在文档中的位置：列表渲染 --> 一个组件的v-for

// 对 $emit 相关内容的用法还不是很明白

Vue.component('todo-item', {
    props: ['title'],
    template: `<li>
    {{title}}
    <button v-on:click="$emit('remove')">X</button>
</li>`
})


var vm = new Vue({
    el: '#app',
    data: {
        newTodoText: '',
        nextTodoID: 4,
        todos: [{
            id: 1,
            title: 'Learn the docs of Vue.js'
        }, {
            id: 2,
            title: 'Practice code samples'
        }, {
            id: 3,
            title: 'Create a demo'
        }]
    },
    methods: {
        addNewTodo: function () {
            this.todos.push({
                id: this.nextTodoID++,
                title: this.newTodoText
            })
            // 添加项目后清空 input
            this.newTodoText = ''
        }
    }
})