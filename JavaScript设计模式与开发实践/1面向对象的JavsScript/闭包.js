// 1. 封装变量

var mult = (function () {
    const cache = {};
    const calculate = function () {
        let a = 1;
        for (let i = 0; i < arguments.length; i++) {
            a = a * arguments[i]
        }
        return a;
    }
    return function () {
        let args = [].prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }
        return cache[args] = calculate.apply(null, args)
    }
})()

// 2. 延续局部变量的寿命
var report = (function () {
    var imgs = [];
    return function (src) {
        var img = new Image();
        imgs.push(src);
        img.src = src;
    }
})()