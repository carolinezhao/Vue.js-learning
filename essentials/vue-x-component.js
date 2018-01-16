// 下拉选择框的复用
// 原文链接：https://www.jianshu.com/p/9ad1ba89a04b

// 组件结构关系：最外层是 root 实例，其次是 my-select，最内层是 my-list
// 在 root 中定义 data，数据从 root 向下传递
// 点击每个列表项，把值传到输入框。在子组件中使用 $emit(eventName,value) 触发事件，在父组件中使用 v-on 监听事件。

// 全局注册组件
Vue.component('my-select', {
    // 这里的数据没有用上？
    data: function () {
        return {
            city: ['NY', 'DC', 'SF']
        }
    },
    // 这里只是声明要从父组件拿数据，并不指定。
    // 实际使用数据的是子组件，子组件要绑定list，通过props拿到list。
    // 在html的组件标签中用v-bind绑定list，分别指定传入特定的数据。
    props: ['list'],
    methods: {
        changeValue: function (value) {
            console.log(value)
            // 如何把值传入input的value？？
            this.value = value
        }
    },
    template: `<section class="wrap">
    <div class="searchInput clearFix">
        <div class="clearFix">
            <input type="text" class="keyWord" value="">
            <my-button></my-button>
            <br>
        </div>
        <my-list v-bind:list='list' v-on:receive='changeValue'></my-list>
    </div>
</section>`
})

// 注册子组件1：下拉列表。把父组件中下拉列表的部分改为子组件标签。
// 从父组件中获得的list传入v-for中的list使用。
Vue.component('my-list', {
    props: ['list'],
    methods: {
        getValue: function (item) {
            // 怎么拿到 li 中的文本？
            console.log(item)
            this.$emit('receive', item)
        }
    },
    template: `<ul class="list">
    <li v-for='item in list' v-on:click='getValue'>{{item}}</li>
</ul>`
})

// 注册子组件2：按钮。怎么给按钮传入不同的value？
Vue.component('my-button', {
    template: `<input type="button" value="search">`
})


// 初始化 root 实例
var vm = new Vue({
    el: '#app',
    data: {
        city: ['Beijing', 'Shanghai', 'Shenzhen', 'Guangzhou', 'Hangzhou'],
        frontEnd: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Node.js']
    }
})