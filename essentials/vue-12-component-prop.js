// 组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。
// "Vue实例是Vue应用的启动器，Vue组件是Vue实例的扩展。"

// 全局注册
// Vue.component(tagName, options)
Vue.component('my-component', {
    template: '<div>A global custom component!</div>'
})

// 局部注册
// 可以通过某个 Vue 实例/组件的实例选项 components 注册仅在其作用域中可用的组件
// parent 实例 == root 实例 局部注册就和全局注册一样了？
// 本例注册在vue实例中
var Child = {
    template: '<div>A local custom component!</div>'
}



// DOM 模板解析注意事项
// 当使用 DOM 作为模板时 (例如，使用 el 选项来把 Vue 实例挂载到一个已有内容的元素上)，会受到 HTML 本身的一些限制。
// <ul>、<ol>、<table>、<select> 等元素里允许包含的元素有限制，而 <option> 等元素只能出现在某些特定元素的内部。
// 如：在 <ul> 元素内只有 <li> 元素会被看作有效内容；<table> 中只能用 <tr>
// 解决方案：使用特殊的 is 特性，其中 my-row 是自定义组件。<ul> 中的用法类似，见 vue-9-todo-list 中的使用。
// <table>
//   <tr is="my-row"></tr>
// </table>

// 如果使用以下字符串模板，则没有这些限制。（做实例练习）
// <script type="text/x-template">
// JavaScript 内联模板字符串
// .vue 组件



// 组件中 data 必须是工厂函数（返回一个对象）
Vue.component('simple-counter', {
    template: '<button v-on:click="counter +=1">{{counter}}</button>',
    data: function () {
        // 为每个组件返回全新的数据
        return {
            counter: 0
        }
    }
})
// 反例
// var data = {
//     counter: 0
// }
// Vue.component('simple-counter', {
//     template: '<button v-on:click="counter +=1">{{counter}}</button>',
//     // 技术上 data 的确是一个函数了，因此 Vue 不会警告，但却给每个组件实例返回了同一个对象的引用
//     data: function () {
//         return data
//     }
// })
// 三个组件实例共享了同一个 data 对象，因此递增一个 counter 会影响所有组件



// 组件组合
// prop 向下传递，事件向上传递。
// 父子组件的关系：父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息。

// 使用 Prop 传递数据
// 组件实例的作用域是孤立的。不能在子组件的模板内直接引用父组件的数据。父组件的数据需要通过 prop 才能下发到子组件中。
// 当使用的不是字符串模板时，js中 camelCase (驼峰式命名) 的 prop 需要转换为相对应的 kebab-case (短横线分隔式命名) 在html中使用。
Vue.component('child', {
    // 用 props 选项声明它预期的数据。
    props: ['myMessage'],
    // 就像 data 一样，prop 也可以在模板中使用，同样也可以在 vm 实例中通过 this.message 来使用
    template: '<p>{{myMessage}}</p>'
})

// 动态 Prop
// 在 html 中用 v-bind 动态地将 prop 绑定到父组件的数据。要绑定的参数是 message (prop-name)，它的值是父组件中真实的 data
Vue.component('dynamic-child', {
    props: ['message'],
    template: '<h1>{{message}}</h1>'
})

// 把一个对象的所有属性作为 prop 进行传递，props 应该传入的是什么？真实的属性名？
Vue.component('dynamic-child-2', {
    props: ['text'],
    template: '<ul><li>{{text}}</li></ul>'
})
// ***** 问题：props 中什么时候传入的是真实 data，什么时候只是占位？？ *****



// 单向数据流
// Prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态。
// 不应该在子组件内部改变 prop。但在两种情况下，会希望去修改 prop 中数据：

// 1）Prop 作为初始值传入后，子组件想把它当作局部数据来用。
// 解决：定义一个局部变量，并用 prop 的值初始化它。
Vue.component('used-as-local', {
    props: ['initialCounter'],
    data: function () {
        console.log(typeof this.initialCounter)  // string
        return {            
            counter: this.initialCounter + 222
        }
    },
    template:'<p>{{counter}}</p>'
})

// 2）Prop 作为原始数据传入，由子组件处理成其它数据输出。
// 解决：定义一个计算属性，处理 prop 的值并返回。
Vue.component('used-as-computed', {
    props: ['size'],
    computed: {
        normalizedSize: function () {
            return this.size.trim().toLowerCase()
        }
    },
    template:'<p>{{normalizedSize}}</p>'    
})

// 注意：在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。



// Prop 验证（用时查看）



// 非 prop 特性
// 可以直接传入组件，不需要定义相应的 prop。
// 组件可以接收任意传入的特性，这些特性都会被添加到组件的根元素上。
Vue.component('bs-date-input',{
    template:'<input type="date" class="form-control">'
})

// 替换/合并现有的特性
// 对于多数特性来说，传递给组件的值会覆盖组件本身设定的值。即例如传递 type="large" 将会覆盖 type="date" 且有可能破坏该组件！
// 所幸我们对待 class 和 style 特性会更聪明一些，这两个特性的值都会做合并 (merge) 操作，让最终生成的值为：form-control date-picker-theme-dark。



// *** 注意确保在初始化根实例之前注册组件！！***

// 初始化根实例
var vm = new Vue({
    el: '#app',
    data: {
        parentMsg: 'Message from parent',
        todo: {
            text: 'Learning Vue.js',
            isComplete: false
        }
    },
    components: {
        // 局部注册的 <my-comp> 只在父组件模板中可用
        'my-comp': Child
    }
})