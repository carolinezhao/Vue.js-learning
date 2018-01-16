// 为了让组件可以组合，需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为内容分发。
// 内容分发 API：使用 <slot> 元素作为原始内容的插槽。

// 编译作用域
// 父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
// 一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法。
// 如果要绑定子组件作用域内的指令到一个组件的根节点，应当在子组件自己的模板里做。
// 被分发的内容会在父作用域内编译。


// 单个插槽
// 除非子组件模板包含至少一个 <slot> 插口，否则父组件的内容将会被丢弃。
// 当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。
// 最初在 <slot> 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。
// 父组件
Vue.component('parent-component', {
    template: `<div>
    <h1>我是父组件的标题</h1>
    <child-component>
      <p>这是一些初始内容</p>
      <p>这是更多的初始内容</p>
    </child-component>
  </div>`,
    data: function () {
        return {}
    }
})
// 子组件
Vue.component('child-component', {
    template: `<div>
               <h2>我是子组件的标题</h2>
               <slot>只有在没有要分发的内容时才会显示。</slot>
               </div>`,
    data: function () {
        return {}
    }
})


// 具名插槽
// <slot> 元素可以用一个特殊的特性 name 来进一步配置如何分发内容。多个插槽可以有不同的名字。具名插槽将匹配内容片段中有对应 slot 特性的元素。
// 仍然可以有一个匿名插槽，它是默认插槽，作为找不到匹配的内容片段的备用插槽。如果没有默认插槽，这些找不到匹配的内容片段将被抛弃。
// 在设计组合使用的组件时，内容分发 API 是非常有用的机制。
// 父组件模板中的子组件标签可能在最外层！！
Vue.component('parent-component-2', {
    template: `<child-component-2>
    <h1 slot="header">这里可能是一个页面标题</h1> 
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
    <p slot="footer">这里有一些联系信息</p>
  </child-component-2>`
})
// 子组件
Vue.component('child-component-2', {
    template: `<div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>`
})


// 作用域插槽
// 作用域插槽是一种特殊类型的插槽，用作一个 (能被传递数据的) 可重用模板，来代替已经渲染好的元素。
// 在父级中，具有特殊特性 slot-scope 的 <template> 元素必须存在，表示它是作用域插槽的模板。
// slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象。
Vue.component('parent-component-3', {
    template: `<div class="parent">
    <child-component-3>
      <template slot-scope="props">
        <p>hello from parent</p>
        <p>{{ props.text }}</p>
      </template>
    </child-component-3>
  </div>`
})

// 子组件中，只需将数据传递到插槽，就像将 prop 传递给组件一样。
Vue.component('child-component-3', {
    template: `<div class="child">
    <slot text="hello from child"></slot>
  </div>`
})

// 在 2.5.0+，slot-scope 能被用在任意元素或组件中而不再局限于 <template>。

// 作用域插槽更典型的用例是在列表组件中，允许使用者自定义如何渲染列表的每一项？？？和直接渲染列表的区别是？
// 作用域插槽也可以是具名的
// 父组件
Vue.component('list-with-slot', {
    props: ['items'],
    template: `<awesome-list :items="items">
    <li
      slot="item"
      slot-scope="props"
      class="my-fancy-item">
      {{ props.text }}
    </li>
  </awesome-list>`
})

// 子组件
Vue.component('awesome-list', {
    props: ['items'],
    template: `<ul>
    <slot name="item"
      v-for="item in items"
      :text="item.text">
      <p>write down your todo items</p>
    </slot>
  </ul>`
})

// props 中不只是占位吗，为什么不能变？

// 解构？？？
// slot-scope 的值实际上是一个可以出现在函数签名参数位置的合法的 JavaScript 表达式。
// 这意味着在受支持的环境 (单文件组件或现代浏览器) 中，还可以在表达式中使用 ES2015 解构。
/*<child>
  <span slot-scope="{ text }">{{ text }}</span>
</child>*/



var vm = new Vue({
    el: '#app',
    data: {
        items: [{
            index: 1,
            text: 'learning Vue.js'
        }, {
            index: 2,
            text: 'drinking tea'
        }]
    },
    methods: {}
})