'use strict';

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
            [' h with jsx ']
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
    el: '#app'
});