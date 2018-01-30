
### v-bind:attributeName="attributeValue" --> *vue-5-class*

动态绑定 class 和 style 

可以传入属性/对象/对象的计算属性/数组/数组对象

    v-bind:class="classObject"
    v-bind:style="styleObject"
    
    classObject:{
         active: true,
         error: false,
         update: true
    }

### props --> *vue-12-component-prop*

#### 1.都叫做使用父组件数据，但是名字不能乱起。

* 在 html 标签中对 prop 赋值 -- prop 名称可以自定义，前后一致即可。
* 直接使用父组件（比如实例）已有的数据 -- prop 名称必须是父组件中真实存在的。

#### 2.字面量语法 vs 动态语法

* prop 是字面量语法，给其赋值均为字符串；
* 若想传递 js 表达式，则需要用 v-bind 绑定 prop。基于1，v-bind 绑定的 prop 也有两种：


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