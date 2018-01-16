// 动态组件
// 通过使用保留的 <component> 元素，并对其 is 特性进行动态绑定，可以在同一个挂载点动态切换多个组件。

// keep-alive
// 如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数。


var vm = new Vue({
    el: '#app',
    data: {
        currentView: 'home'
    },
    components: {
        home: {
            template: `<p>My home is in Beijing</p>`
        },
        posts: {
            template: `<h1>Dynamic Components</h1>`
        },
        archive: { /* ... */ }
    }
})