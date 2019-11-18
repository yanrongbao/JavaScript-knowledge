// 4.1以其他函数为参数的函数
//4.1.1关于传递函数的思考max  finder best
var log = console.log;
function plucker(field) {
    return function (o) {
        return (o && o[field])
    }
}

_.max([1, 2, 3, 4, 5])//5

//不从数组数组中查找呢
var people = [{ name: 'frde', age: 24 }, { name: 'luck', age: 30 }];
_.max(people, function (obj) { return obj.age })//{ name: 'luck', age: 30 }

function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function (best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);

        return (bestValue === bestFun(best, currentValue) ? best : current)
    })
}

log(finder(_.identity, Math.max, [1, 2, 3, 4, 5]));

log(finder(plucker('age'), Math.max, people));

log(finder(plucker('name'), function (x, y) {
    return (y.charAt(0) === 'l') ? y : x
}, people))

function best(fun, coll) {
    return _.reduce(coll, function (x, y) {
        return fun(x, y) ? x : y
    })
}

log(best(function (x, y) { return x > y }, [1, 2, 3, 4, 5]))

// 4.1.12关于传递函数的更多思考 重复 反复和条件迭代
function repeat(times, value) {
    return _.map(_.range(times), function () {
        return value;
    })
}
log(repeat(4, "Major"))

// 1.使用函数 而不是值
function repeatNess(times, func) {
    return _.map(_.range(times), func)
}
log(repeatNess(3, function () {
    return Math.floor(Math.random() * 10 + 1)
}))

function interateUntil(fun, check, init) {
    var ret = [];
    var result = fun(init);
    while (check(result)) {
        ret.push(result)
        result = fun(result)
    }
    return ret;
}

log(interateUntil(function (n) { return n + n }, function (n) { return n <= 1024 }, 1))

log(repeatNess(10, function (n) { return Math.pow(2, n + 1) }));

// 4.2返回其他函数的函数
// 组合子
function always(value) {
    return function () {
        return value
    }
}
log(repeatNess(3, always('Odelay')))

function invoker(name, method) {
    return function (target) {
        if (!existy(target)) fail('Must provide a target')
        var targetMethod = target[name]
        var arg = _.rest(arguments);
        console.log(target)
        return doWhen((existy(targetMethod) && method === targetMethod), function () {
            return targetMethod.apply(target, arg)
        })
    }
}

function doWhen(cond, action) {
    if (truthy(cond)) {
        return action();
    } else {
        return false;
    }

}


function existy(x) {
    return x != null;
}
function truthy(x) {
    return x !== false && existy(x);
}
function fail(thing) {
    throw new Error(thing)
}
var rev = invoker('reverse', Array.prototype.reverse)
log(_.map([[1, 2, 3]], rev))//[[3,2,1]]

// 4.2.1高阶函数捕获函数

// 4.2.2捕获变量的好处
function uniqueString(len) {
    return Math.random().toString(32).substr(2, len)
}
log(uniqueString(10))

//生成特定前缀的
function uniqueString2(prefix) {
    return [prefix, new Date().getTime()].join('')
}
log(uniqueString2('argent'));

//生成前缀且从某个值开始增长

function uniqueString3(num) {
    var count = num;
    return function (prefix) {
        return [prefix + count++, new Date().getTime()].join('')
    }
}
var prefixNum = uniqueString3(0)
log(prefixNum('argumen'))
log(prefixNum('argumen'))

//将变量隐藏在私有属性 generator中
var omgenerator = (function (init) {
    var count = init;
    return {
        uniqueString: function (prefix) {
            return [prefix + count++].join('')
        }
    }
})(0);
log(omgenerator.uniqueString('licnking-'));
log(omgenerator.uniqueString('licnking-'));

// 4.2.3 防止不存在的函数
var nums = [1, 2, 3, null, 5];
log(_.reduce(nums, function (total, n) { return total * n }));

function fnull(fun) {
    var defaults = _.rest(arguments);
    return function () {
        var args = _.map(arguments, function (e, i) {
            return existy(e) ? e : defaults[i]
        })

        return fun.apply(null, args);
    }
}

var safeMult = fnull(function (total, n) {
    return total * n
}, 1, 1)

log(_.reduce(nums, safeMult));

//给函数对象设置默认值
function defaults(d) {
    return function (o, k) {
        var val = fnull(_.identity, d[k]);
        return o && val(o[k])
    }
}
function doSomething(config) {
    var lookup = defaults({ critical: 108 });
    return lookup(config, 'critical')
}
log(doSomething({ critical: 9 }))
log(doSomething({}))

function checker() {
    var validators = _.toArray(arguments);
    return function (obj) {
        return _.reduce(validators, function (errs, check) {
            if (check(obj)) {
                return errs;
            } else {
                return _.chain(errs).push(check.message).value()
            }
        }, [])
    }
}

var alwaysPasses = checker(always(true), always(true))
log(alwaysPasses({}));

var fail = always(false);
fail.message = 'a failure in life';
var alwaysFails = checker(fail);
log(alwaysFails({}))