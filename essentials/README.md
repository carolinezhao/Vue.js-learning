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

v-model 本质上是语法糖。

v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。因此应该通过 js 在组件的 data 选项中声明初始值。

表单绑定 --> *vue-11-form-bind*

输入框
    
```HTML
    <input v-model="message">
    <!-- 同步显示在 input 中输入的值 -->
    <div>{{message}}</div>
``` 
```js
    data: {
        message: ''
    }
```

多选和单选的区别在于 v-model 绑定的初始值类型
- 初始值为 fasle，则选中为 true
- 初始值为 []，则为多选，数组元素为选中的所有 input 的 value
- 初始值为 ''，则为单选，选中的值为 input 的 value

```HTML
    <input type="checkbox" v-model="checked">

    <input type="checkbox" value="rabbit" v-model="checkedNames">
    <input type="checkbox" value="bear" v-model="checkedNames">
```
```js
    data: {
        checked: false,
        checkedNames: []
    }
```

值 vs 值绑定
- 普通值只能是 string 或 boolean
- 值绑定可以是任何类型值

```HTML
    <input value="string">
    <input v-bind:value="object">
```
```js
    data: {
        object: {}
    }
```

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


## review 4: computed, methods, watch

计算属性名和 data 中的普通属性名不能重复。

计算属性中的函数默认是 getter。需要 setter 时可以设置，但是 getter 必须有。

```js
computed: {
    fullName: { // 计算属性名
        get: function () { // getter
            return
        },
        set: function () { // setter
        }
    }
}
```

### computed vs. methods

--> _vue-3-computed_

```html
<!-- computed -->
<div>{{computedName}}</div>
<!-- methods -->
<div>{{methodName()}}</div>
```

同一个函数定义为计算属性或者方法，两者的结果是相同的，不同的是：

- 只有在依赖的东西发生变化时，计算属性才更新 (基于依赖进行缓存)。
- 无论依赖的东西是否发生变化，每当触发重新渲染时，调用方法将总会再次执行函数。

对于开销较大的依赖，使用计算属性；如果不希望有缓存，则使用方法。

### computed vs. watch

--> _vue-3-computed_ fullname

当有一些数据需要依赖其它数据变动，通常更好的做法是使用计算属性而不是命令式的 watch 回调。

--> _vue-4-watcher_

当需要在数据变化时执行异步或开销较大的操作时，通过 watch 来响应数据的变化。