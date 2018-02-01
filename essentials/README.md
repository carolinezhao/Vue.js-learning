## review 1: v-bind & props

### v-bind:attributeName="attributeValue" --> *vue-5-class*

为标签添加属性

    <p v-bind:attributeName="attributeValue"></p>
    
    渲染结果
    <p attributeName="attributeValue"></p>

常用场景：通过布尔特性动态绑定 class 和 style 

可以传入属性/对象/对象的计算属性/数组/数组对象

    HTML
    v-bind:class="classObject"
    v-bind:style="styleObject"
    
    JS
    classObject:{
         active: true,
         error: false,
         update: true
    }
    
简写

    v-bind:href="url"
    :href="url"

***

### props --> *vue-12-component-prop*

#### 1.都叫做使用父组件数据，但是名字不能乱起。

* 在 html 标签中对 prop 赋值 -- prop 名称可以自定义，前后一致即可。
* 直接使用父组件（比如实例）已有的数据 -- prop 名称必须是父组件中真实存在的。

#### 2.字面量语法 vs 动态语法

* prop 是字面量语法，给其赋值均为字符串；
* 若想传递 js 表达式，则需要用 v-bind 绑定 prop。基于1中两种情况，v-bind 绑定的 prop 也有两种：


        ---HTML---
        v-bind:new-prop-name="msg"
        v-bind:property1="todo.property1"
        v-bind="todo"
        
        ---JS---
        props:['new-prop-name']
        props:['property2']
        
        data:{
              msg:'...',
              todo:{
                   property1:'...',
                   property2:'...'
                   }
              }
              

## review 2: v-on & emit

### v-on:action="functionName(parameter)" --> *vue-10-event-handle*

### $emit() --> *vue-13-component-event*

    ---HTML---
    <component v-on:event="parentFunctionName"></component>
    此处的 v-on 为父组件监听事件。
    
    ---JS---
    Vue.component ...
    template:`<button v-on:click="childFunctionName"><button>`,
    methods:{
              childFunctionName: fucntion() {
                   this.emit("event")
              }
            }
    子组件中的 v-on 监听 click 事件，触发 function，并通过 emit 告知父组件。

    instance ...
    methods:{
              parentFunctionName: function() {}    
              

## review 3: v-model 



表单绑定 --> *vue-11-form-bind*
    
    HTML
    <input v-model="message">
    
    JS
    instance...
    data:{
          message:"..."
         }
         
v-model 的作用相当于：

    <input
        v-bind:value="value"
        v-on:input="event.target.value">

使用自定义事件的表单输入组件 --> *vue-13-component-event*

    JS
    template: `<input
        v-bind:value="value"
        v-on:input="function()">`
    props:['value']
    在 HTML 的 input 中输入文本，即拿到父组件的传值。