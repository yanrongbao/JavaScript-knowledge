Function.prototype.before = function (beforefn) {
    var __self = this; // 保存原函数的引用
    return function () { // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply(this, arguments); // 执行新函数，且保证 this 不被劫持，新函数接受的参数
        // 也会被原封不动地传入原函数，新函数在原函数之前执行
        return __self.apply(this, arguments); // 执行原函数并返回原函数的执行结果，
        // 并且保证 this 不被劫持
    }
}
Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

// 再回到 window.onload 的例子，看看用 Function.prototype.before 来增加新的 window.onload
// 事件是多么简单：
window.onload = function () { alert(1) };
windwo.onload = (window.onload || function () { }).after(function () { alert(2) }).after(function () {
    alert(3);
}).after(function () {
    alert(4);
});
// 值得提到的是，上面的 AOP实现是在 Function.prototype 上添加 before 和 after 方法，但许
// 多人不喜欢这种污染原型的方式，那么我们可以做一些变通，把原函数和新函数都作为参数传入
// before 或者 after 方法：

var before = function (fn, beforefn) {
    return function () {
        beforefn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
}

var a = before(function () { alert(3) },
    function () { alert(2) })

a = before(a, function () { alert(1); });
a();