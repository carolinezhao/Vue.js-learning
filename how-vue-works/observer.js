// https://segmentfault.com/a/1190000006599500

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    console.log(data);
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key]);
    });
};

function defineReactive(data, key, value) {
    var dep = new Dep();

    observe(value); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
            return value;
        },
        set(newValue) {
            if (value === newValue) return;
            console.log(value, newValue);
            value = newValue;
            dep.notify(); // 通知订阅者
        }
    });
}

function Dep() {
    this.subs = []; // 订阅者
}

Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}

Dep.prototype.notify = function () {
    console.log('notify!');
    // this.subs.forEach(sub => sub.update());
}

var data = {
    name: 'rabbit',
    age: 16,
    obj: {
        a: 1,
        b: 2
    }
};

// 在定义函数之前调用，会导致 setter 中 dep 的原型链丢失
observe(data);
data.name = 'caroline';
data.age = 26;
data.obj.b = 3;