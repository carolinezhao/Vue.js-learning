// 知识点：渲染函数基础；实例属性 vm.$slots；虚拟 DOM；正则表达式

// Vue 推荐在绝大多数情况下使用 template 来创建 HTML。然而在一些场景中，需要 JavaScript 的完全编程的能力，这就是 render 函数，它比 template 更接近编译器。

// this.$slots.default 见后面 vm.$slots 部分的示例
// 这个例子中，当不使用 slot 属性向组件中传递内容时，比如 anchored-heading-basic 中的 Hello Render!，这些子元素被存储在组件实例中的 $slots.default中。
// 【基础示例】
Vue.component('anchored-heading-basic', {
    render: function (createElement) {
        return createElement(
            'h' + this.level, // tag name 标签名称
            this.$slots.default // 子组件中的阵列
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})

Vue.component('child', {
    template: `<p>I'm from child component!</p>`
})


// 虚拟 DOM
// Vue 通过建立一个虚拟 DOM 对真实 DOM 发生的变化保持追踪。
// createElement 返回的不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，及其子节点。
// 这样的节点描述为“虚拟节点 (Virtual Node)”，简写“VNode”。“虚拟 DOM”是对由 Vue 组件树建立起来的整个 VNode 树的称呼。

// createElement 参数 和 data 对象
/* @returns {VNode}
createElement(
    // {String | Object | Function}
    // 一个 HTML 标签字符串，组件选项对象，或者一个返回值
    // 类型为 String/Object 的函数，必要参数
    'div',

    // {Object}
    // 一个包含模板相关属性的数据对象
    // 这样，您可以在 template 中使用这些属性。可选参数。
    {
        // 在 VNode 数据对象中，一些属性名是级别最高的字段（见文档），允许绑定普通的 HTML 特性，就像 DOM 属性一样。
    },

    // {String | Array}
    // 子节点 (VNodes)，由 `createElement()` 构建而成，
    // 或使用字符串来生成“文本节点”。可选参数。
    [
        '先写一些文字',
        createElement('h1', '一则头条'),
        createElement(MyComponent, {
            props: {
                someProp: 'foobar'
            }
        })
    ]
) */


// 【完整示例】
// 获取文本节点和子节点中的文本节点--一直向下查找直到没有子节点
// Q：实际传入的参数是 this.$slots.default，为什么可以读取非插槽内容（即createElement创建的节点）？
// A：[关键!] 当不使用 slot 属性向组件中传递内容时，比如 case1 中的 Hey Bear!，这些子元素被存储在组件实例中的 $slots.default中。

// Q：通过实际插槽显示的（子组件模板中的内容）无法被读取（case2）？
// Q：case2 的 VNode 中有tag：vue-component-4-children ？其中childre是子组件名称；case3的 VNodes 中的内层 VNode 有tag

var getChildrenTextContent = function (children) {
    console.log(children)
    var newArray = children.map(function (node) {
        // children 和 node 的区别是 _proto_ ？            
        return node.children ?
            getChildrenTextContent(node.children) :
            node.text
    })
    console.log(newArray)
    return newArray.join('') // 将数组中的元素连接为一个string
}

Vue.component('anchored-heading', {
    render: function (createElement) {
        // 创建 kebabCase 格式的 headingId, 在 createElement 中作为节点的属性
        var headingId = getChildrenTextContent(this.$slots.default)
            .toLowerCase()
            .replace(/\W+/g, '-') // 将所有非文字符号替换为-
            .replace(/(^\-|\-$)/g, '') // 去掉开头的-,结尾的-

        return createElement(
            'h' + this.level, // para1
            // para3: 子节点 (VNodes)
            [
                createElement('a', // para1
                    // para2：模板相关属性
                    {
                        attrs: {
                            name: headingId,
                            href: '#' + headingId
                        }
                    },
                    // para3：子节点 (VNodes)
                    this.$slots.default)
            ]
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})

// 子组件中的内容通过虚拟节点中的 this.$slots 显示
Vue.component('children', {
    template: `<p>From a component called children.</p>`
})
console.log(typeof children) // undefined


// 约束
// 组件树中的所有 VNodes 必须是唯一的。
// 如果真的需要重复很多次的元素/组件，可以使用工厂函数(返回一个对象)来实现。
// 【创建重复节点】
Vue.component('repeat-vnodes', {
    render: function (createElement) {
        var createRepeatNodes = Array.apply(
            null, {
                length: 6 // length 为特殊字段：生成一个长度为6的数组
            }
        ).map(function () { // 对数组的元素进行赋值，注意是在 apply 之外
            return createElement('p', 'Vue')
        })
        console.log(typeof createRepeatNodes) // object
        return createElement('div', {
                attrs: {
                    class: 'framework'
                }
            },
            // 子节点
            createRepeatNodes)
    }
})


// 使用 JavaScript 代替模板功能



// 实例属性 vm.$slots
// 用来访问被插槽分发的内容。每个具名插槽有其相应的属性 (例如：slot="foo" 中的内容将会在 vm.$slots.foo 中被找到)。
// default 属性包括了所有没有被包含在具名插槽中的节点。[关键!] 包括没有使用 slot 属性向组件中传递的内容。
Vue.component('blog-post', {
    render: function (createElement) {
        var header = this.$slots.header
        var body = this.$slots.default
        var footer = this.$slots.footer
        return createElement('div', {
            'class': {
                container: true
            },
            style: {
                border: '2px solid #f8f8f8'
            }
        }, [
            createElement('header', header),
            createElement('main', body),
            createElement('footer', footer)
        ])
    }
})

// 从 this.$slots 获取 VNodes 列表中的静态内容：
Vue.component('this-slot', {
    render: function (createElement) {
        // `<div><slot></slot></div>`
        return createElement('div', this.$slots.default)
    }
})

// 从 this.$scopedSlots 中获得能用作函数的作用域插槽(？？)，这个函数返回 VNodes：
// ？？？"TypeError: this.$scopedSlots.default is not a function"
// Vue.component('scoped-slot', {
//     render: function (createElement) {
//         // `<div><slot :text="msg"></slot></div>`
//         return createElement('div', [
//             this.$scopedSlots.default({
//                 text: this.msg
//             })
//         ])
//     },
//     // props: ['msg']
// })

// 如果要用渲染函数向子组件中传递作用域插槽(？？)，可以利用 VNode 数据中的 scopedSlots 域：
Vue.component('render-slot', {
    render: function(createElement) {
        return createElement('div', [
            createElement('baby', {
                // pass `scopedSlots` in the data object
                // in the form of { name: props => VNode | Array<VNode> }
                scopedSlots: {
                    default: function (props) {
                        return createElement('span', props.text)
                    }
                }
            })
        ])
    }
})
Vue.component('baby',{
    template:'<p>This is confusing.</p>'
})



var vm = new Vue({
    el: '#app',
    data: {
        message: 'Data from instance',
        number: 5       
    }
})