var vm = new Vue({
    el: '#app',
    data: {
        ifCheck: false,
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
        // ====== 是否选中 ======
        changeEvent(e) {
            console.log('@change')
            // this.ifCheck = !this.ifCheck // doesn't work，change 事件无法改变 v-model 的值 (它自己会改变)
        },
        inputEvent(e) {
            console.log('@input')
            this.ifCheck = !this.ifCheck // work，因为 v-model 拿到的就是通过 input 事件得到的值 (即使不写也默认执行此操作)
        },
        // ====== 全选 ======
        changeCheckAll(e) {
            console.log('@change')
            console.log(e.target.checked);
            console.log(this.checked); // 与上相同
            this.checkedObjs = (this.checked) ? this.checkedAllObjs : [] // work
        },
        inputCheckAll(e) {
            console.log('@input')
            console.log(e.target.checked);
            console.log(this.checked); // 与上相反 (默认执行 !this.checked)
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