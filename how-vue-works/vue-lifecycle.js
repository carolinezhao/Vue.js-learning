let vm = new Vue({
    el: '#app',
    data: {
        info: 'instance data',
        ifUpdate: false
    },
    computed: {
        date () {
            return (new Date()).toDateString()
        }
    },
    beforeCreate (){
        console.log("====== beforeCreate ======")
        console.log(this.info) // undefined
        console.log(this.$el) // undefined
    },
    created (){
        console.log("====== created ======")
        console.log(this.info) // exist
        console.log(this.$el) // undefined
    },
    beforeMount (){
        console.log("====== beforeMount ======")
        console.log(this.info) // exist
        console.log(this.$el) // Virtual DOM: elements exist (includes v-if) but data haven't been rendered
    },
    mounted (){
        console.log("====== mounted ======")
        console.log(this.info) // exist
        console.log(this.$el) // exist and data have been rendered
    },
    beforeUpdate (){
        console.log("====== beforeUpdate ======")
        console.log(this.info)
        console.log(this.$el) // data changed
    },
    updated (){
        console.log("====== updated ======")
        console.log(this.info)
        console.log(this.$el) // data changed
    },
    beforeDestroy (){
        console.log("====== beforeDestroy ======")
        console.log(this.info) // still exist
        console.log(this.$el) // still exist
    },
    destroyed (){
        console.log("====== destroyed ======")
        console.log(this.info) // still exist
        console.log(this.$el) // still exist
    }
})

// reference
// http://www.cnblogs.com/gagag/p/6246493.html