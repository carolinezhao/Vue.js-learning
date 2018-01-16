var vm = new Vue({
    el: '#app',
    data: {
        seen: false,
        type: 'D',
        loginType: 'email',
        verifyType: 'phone'
    },
    methods:{
        toggleLogin:function(){
            if (this.loginType === 'email') {
                return this.loginType = 'username'
            } else {
                return this.loginType = 'email'                
            }
        },
        toggleVerify:function(){
            if (this.verifyType === 'phone') {
                return this.verifyType = 'wechat'
            } else {
                return this.verifyType = 'phone'                
            }
        },
    }
})