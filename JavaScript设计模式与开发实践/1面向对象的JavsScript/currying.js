// var cost = (function () {
//     var args = [];
//     return function () {
//         if (arguments.length === 0) {
//             var money = 0;
//             for (let i = 0; i < args.length; i++) {
//                 money += args[i]
//             }
//             return money;
//         } else {
//             [].push.apply(args, arguments)
//         }
//     }
// })()
// cost(100);
// cost(200);
// cost(300);
// console.log(cost()); // 求值并输出：600

var currying = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
}

var cost = (function () {
    var money = 0;
    return function () {
        for (let i = 0; i < arguments.length; i++) {
            money += arguments[i];

        }
        return money;
    }
})()
var cost = currying(cost); // 转化成 currying 函数
cost(100); // 未真正求值
cost(200); // 未真正求值 
cost(3001); // 未真正求值
console.log(cost()); // 求值并输出：600