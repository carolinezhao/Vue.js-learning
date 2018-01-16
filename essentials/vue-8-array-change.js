var vm = new Vue({
    el: '#app',
    data: {
        items: [{
            todo: 'reading document'
        }, {
            todo: 'coding'
        }, {
            todo: 'review'
        }],
        numbers: [1, 2, 3, 4, 5]
    },
    methods: {
        replace: function () {
            // 非变异方法
            this.items = this.items.filter(function (item) {
                return item.todo.match(/coding/) // 这是啥意思？
            })
        },
        // 被筛选数组作为参数调用
        even:function(numbers) {
            return numbers.filter(function (number) {
                return number % 2 === 0
            })
        }
    },
    computed:{
        // 通过 this 使用被筛选数组
        evenNumbers:function(){
            return this.numbers.filter(function(number) {
                return number % 2 === 0
            })
        }
    }
})