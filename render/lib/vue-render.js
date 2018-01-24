'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// 知识点：渲染函数基础；实例属性API；虚拟 DOM；正则表达式

// Vue 推荐在绝大多数情况下使用 template 来创建 HTML。然而在一些场景中，需要 JavaScript 的完全编程的能力，这就是 render 函数，它比 template 更接近编译器。

// 实例属性 vm.$slots 用来访问被插槽分发的内容。
// 具名插槽有其相应的属性。default 属性包括了所有没有被包含在具名插槽中的节点。
// 这个例子中，当不使用 slot 属性向组件中传递内容时，比如 anchored-heading 中的 Hello Render!，这些子元素被存储在组件实例中的 $slots.default中。

// 【基础示例】
Vue.component('anchored-heading-basic', {
    render: function render(createElement) {
        return createElement('h' + this.level, // tag name 标签名称
        this.$slots.default // 子组件中的阵列，是 object
        );
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
});

Vue.component('child', {
    template: '<p>I\'m from child component!</p>'
});

// 虚拟 DOM
// Vue 通过建立一个虚拟 DOM 对真实 DOM 发生的变化保持追踪。
// createElement 返回的不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，及其子节点。
// 这样的节点描述为“虚拟节点 (Virtual Node)”，简写“VNode”。“虚拟 DOM”是对由 Vue 组件树建立起来的整个 VNode 树的称呼。

// createElement 参数
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
        // (详情见下一节)
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

// 深入 data 对象
// 在 VNode 数据对象中，一些属性名是级别最高的字段（见文档），允许绑定普通的 HTML 特性，就像 DOM 属性一样。


// 【完整示例】
// 获取文本节点和子节点中的文本节点--一直向下查找直到没有子节点
// 实际传入的参数是 this.$slots.default，但是真正通过slot显示的（子组件模板中的内容）无法被读取（case2）？
// case2 的 VNode 中有tag：vue-component-4-children ？其中childre是子组件名称；case3的 VNodes 中的内层 VNode 有tag
var getChildrenTextContent = function getChildrenTextContent(children) {
    console.log(children);
    var newArray = children.map(function (node) {
        // children 和 node 的区别是 _proto_ ？            
        return node.children ? getChildrenTextContent(node.children) : node.text;
    });
    console.log(newArray);
    return newArray.join(''); // 将数组中的元素连接为一个string
};

Vue.component('anchored-heading', {
    render: function render(createElement) {
        // 创建 kebabCase 格式的 headingId, 在 createElement 中作为节点的属性
        var headingId = getChildrenTextContent(this.$slots.default).toLowerCase().replace(/\W+/g, '-') // 将所有非文字符号替换为-
        .replace(/(^\-|\-$)/g, ''); // 去掉开头的-,结尾的-

        return createElement('h' + this.level, // para1
        // para3: 子节点 (VNodes)
        [createElement('a', // para1
        // para2
        {
            // 模板相关属性
            attrs: {
                name: headingId,
                href: '#' + headingId
            }
        },
        // para3
        this.$slots.default)]);
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
});

// 子组件中的内容通过虚拟节点中的 this.$slots 显示
Vue.component('children', {
    template: '<p>From a component called children.</p>'
});
console.log(typeof children === 'undefined' ? 'undefined' : _typeof(children)); // undefined

// 约束
// 组件树中的所有 VNodes 必须是唯一的。
// 如果真的需要重复很多次的元素/组件，可以使用工厂函数(返回一个对象)来实现。
// 【创建重复节点】
Vue.component('repeat-vnodes', {
    render: function render(createElement) {
        var createRepeatNodes = Array.apply(null, {
            length: 8 // length 为特殊字段：生成一个长度为8的数组
        }).map(function () {
            // 对数组的元素进行赋值，注意是在 apply 之外
            return createElement('p', 'Vue');
        });
        console.log(typeof createRepeatNodes === 'undefined' ? 'undefined' : _typeof(createRepeatNodes)); // object
        return createElement('div', {
            attrs: {
                class: 'framework'
            }
        },
        // 子节点
        createRepeatNodes);
    }
});

// JSX
// 简化 render 函数：使用 Babel 插件，用于在 Vue 中使用 JSX 语法，回到更接近于模板的语法上。
// 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的，如果在作用域中 h 失去作用，在应用中会触发报错。
// Note the h function, which is a shorthand for a Vue instance's $createElement method, must be in the scope where the JSX is.

Vue.component('jsx-example', {
    render: function render(h) {
        // <-- h must be in scope
        return h(
            'div',
            {
                attrs: { id: 'foo' }
            },
            ['h with jsx']
        );
    }
});

// Babel 会将上述语句翻译为：
Vue.component('normal-example', {
    render: function render(h) {
        // <-- h must be in scope
        return h('div', {
            attrs: {
                id: 'foo'
            }
        }, 'hhhhh');
    }
});

var vm = new Vue({
    el: '#app',
    data: {
        message: 'Data from instance',
        number: 5
    }
});