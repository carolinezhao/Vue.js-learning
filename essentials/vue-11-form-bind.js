var vm = new Vue({
    el: '#app',
    data: {
        message: '',
        text: '',
        checked: false,
        checkedNames: [], // 初始值应为空数组，如果为空字符串，则无法多选
        picked: '',
        selected: '',
        multiSelected: [],
        listSelected: 'A',
        options: [{
            text: 'MacDonald',
            value: 'A'
        }, {
            text: 'KFC',
            value: 'B'
        }, {
            text: 'Pizza Hut',
            value: 'C'
        }],
        toggle: 'no',
        pick: '',
        a: 'hi'
    }
})