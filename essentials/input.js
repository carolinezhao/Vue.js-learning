var vm = new Vue({
    el: '#app',
    data: {
        checked: false,
        checkedObjs: [],
        objectsArr: [{
            type: 'frontend'
        }, {
            type: 'backend'
        }, {
            type: 'devops'
        }],
        events: []
    },
    computed: {
        checkedAllObjs() {
            let allObjs = []
            this.objectsArr.forEach((item, index) => {
                allObjs.push({
                    index: index,
                    type: item.type
                })
            })
            return allObjs
        }
    },
    watch: {
        checkedObjs (newValue) {
            this.checked = (newValue.length === this.checkedAllObjs.length)
        }
    },
    methods: {
        // ====== 全选 ======
        changeCheckAll() {
            console.log('@change')
            // this.checked = !this.checked // doesn't work
            this.checkedObjs = (this.checked) ? this.checkedAllObjs : [] // work
        },
        inputEvent() {
            console.log('@input')
            // this.checked = !this.checked // works
            // this.checkedObjs = (this.checked) ? this.checkedAllObjs : [] // doesn't work
        },
        // ====== 对比 input 和 change ======
        // 参数是 Event {} 中的两个属性
        addEvent({type,target}) {
            // console.log({type})
            const event = {
                type, // key-value
                target: { // target 对象中要用到的两个属性
                    value: target.value,
                    checked: target.checked
                }
            }
            this.events.push(event)
        },
        eventText(e) {
            return `${e.type}: ${e.target.value}, ${e.target.checked}`
        },
        empty() {
            this.events = []
        }
    }
})