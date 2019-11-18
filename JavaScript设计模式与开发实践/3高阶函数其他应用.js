// 1.currying
var cost = (function () {
    var args = [];
    return function () {
        if (arguments.length == 0) {
            var result = 0;
            for (var i = 0; i < args.length; i++) {
                result += args[i]
            }
            return result;
        } else {
            [].push.apply(args, arguments)
        }
    }
})()
cost(100);
cost(200);
cost(300);
console.log(cost());

var currying = function (fn) {
    var arg = [];
    return function () {
        if (arguments.length == 0) {
            return fn.apply(this, arg)
        } else {
            [].push.apply(arg, arguments);
            return arguments.callee;
        }
    }
}

var cost2 = (function () {
    var money = 0;
    return function () {
        for (var i = 0; i < arguments.length; i++) {
            money += arguments[i]
        }
        return money;
    }
})()

var cost3 = currying(cost2)
cost3(100);
cost3(100);
cost3(100);
console.log(cost3())

// 2.uncurrying
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments)
    }
}
var push = Array.prototype.push.uncurrying();
(function () {
    push(arguments, 4);
    console.log(arguments)
})(1, 2, 3)

for (var i = 0, fn, arr = ['push', 'shift', 'forEach']; fn = arr[i++];) {
    Array[fn] = Array.prototype[fn].uncurrying();
}

var obj = {
    'length': 3,
    '0': 1,
    '1': 2,
    '2': 3
}
Array.push(obj, 4);

var first = Array.shift(obj)
console.log(first);
console.log(obj);

Array.forEach(obj, function (n, i) {
    console.log(i)
})

// 3.函数节流
var throttle = function (fn, interval) {
    var _self = fn, first = true, timer;
    return function () {
        var args = arguments,
            _me = this;
        if (first) {
            _self.apply(_me, args);
            return first = false;
        }
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            _self.apply(_me, args)
        }, interval || 500)
    }
}

// 4.分时函数
var timeChunk = function (arr, fn, count) {
    var obj, t;
    var start = function () {
        for (let i = 0, count = Math.min(count || 1, arr.length); i < count; i++) {
            obj = arr.shift();
            fn(obj)
        }
    }
    return function () {
        t = setInterval(function () {
            if (arr.length == 0) {
                return clearInterval(t)
            }
            start()
        }, 200)
    }
}

// 5.惰性加载函数
var addEvent = function () {
    if (window.addEventListener) {
        addEvent = function (elem, type, handle) {
            return elem.addEventListener(type, handle, false)
        }
    } else if (window.attachEvent) {
        addEvent = function () {
            attachEvent('on' + type, handle)
        }
    }
    addEvent(elem, type, handle)
}