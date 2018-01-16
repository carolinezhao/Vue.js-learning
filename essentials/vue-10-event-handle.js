var vm = new Vue({
    el: '#app',
    data: {
        counter: 0,
        name: 'Vue.js'
    },
    methods: {
        greet: function (event) {
            // 如果不传参数，可通过此途径定义
            // let event = window.event
            alert('Hello ' + this.name + '!')
            // event 是原生 DOM 事件
            if (event) {
                // 事件绑定的元素
                alert(event.target.tagName)
            }
        },
        say: function (message) {
            alert(message)
        },
        warn: function (message, event) {
            if (event) {
                // 阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）。这个 event 参数来自事件绑定函数。                
                event.preventDefault()
            }
            alert(message)
        }
    }
})