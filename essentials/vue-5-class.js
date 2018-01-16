var vm = new Vue({
    el: '#app',
    data: {
        // class 的状态变量
        isActive: true,
        hasError: false,
        error: {
            type: 'fatal'
        },
        classObject: {
            // class 本身
            active: true,
            update: true,
            error: false
        },
        // 冒号后是class
        activeClass: 'active',
        errorClass: 'text-danger',

        activeColor: 'salmon',
        fontSize: 20,
        styleObject: {
            // 如果这里是 activeColor 则无法显示？
            color: 'green',
            // 有单位需要加引号
            fontSize: '20px'
        },
        baseStyles: {
            backgroundColor: '#dcdcdc'
        }, 
        overridingStyles:{
            fontStyle: 'Italic'
        }
    },
    computed: {
        classObject2: function () {
            // 返回一个对象
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal'
            }
        }
    }
})