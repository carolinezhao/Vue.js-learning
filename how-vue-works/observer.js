// https://segmentfault.com/a/1190000006599500

var data = {
    name: 'rabbit',
    age: 16,
    obj: {
        a: 1,
        b: 2
    }
};

observe(data);
data.name = 'caroline';
data.age = 26;
data.obj.b = 3;

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
    observe(value); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
            return value;
        },
        set(newValue) {
            console.log(value, newValue);
            value = newValue;
        }
    });
}