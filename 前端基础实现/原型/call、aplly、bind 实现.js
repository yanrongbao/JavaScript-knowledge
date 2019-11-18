// bind 实现
// 箭头函数的 this 永远指向它所在的作用域
// 函数作为构造函数用 new 关键字调用时，不应该改变其 this 指向，因为 new绑定 的优先级高于 显示绑定 和 硬绑定
Function.prototype.mybind = function (thisArg) {
    if (typeof this !== 'function') {
        throw TypeError('Bind must be called on a function');
    }
    //保存参数
    const args = Array.prototype.slice.call(arguments, 1),
        //保存原型对象
        self = this,
        //定义一个干净的函数储存原型
        nop = function () { },
        bound = function () {
            return self.apply(this instanceof nop ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
        }

    if (this.prototype) {
        nop.prototype = this.prototype
    }
    bound.prototype = new nop();
    return bound;
}
const bar = function () {
    console.log(this.name, arguments);
};

bar.prototype.name = 'bar';

const foo = {
    name: 'foo'
};
// const bound = bar.mybind(foo, 22, 33, 44);
// new bound(); // bar, [22, 33, 44]
// bound(); // foo, [22, 33, 44]



// call 实现
Function.prototype.mycall = function (thisArg) {
    // this指向调用call的对象
    if (typeof this !== 'function') {
        // 调用call的若不是函数则报错
        throw new TypeError('Error');
    }
    const args = [...arguments].slice(1);
    thisArg = thisArg || window;
    thisArg.fn = this;
    const result = thisArg.fn(...args);
    delete thisArg.fn;
    return result
}
Function.prototype.myapply = function (thisArg) {
    if (typeof this !== 'function') {
        throw this + ' is not a function';
    }

    const args = arguments[1];

    thisArg.fn = this;

    const result = thisArg.fn(...arg);

    delete thisArg.fn;

    return result;
};
bar.mycall(foo, 22, 33, 44);
bar.myaplly(foo, [1, 2, 3]); // foo [1, 2, 3]