// 3.3动态作用域
var log = console.log;
var globals = {}
function makeBindFun(resolver) {
    return function (k, v) {
        var stack = globals[k] || [];
        globals[k] = resolver(stack, v);
        return globals
    }
}

var stackBinder = makeBindFun(function (stack, v) {
    stack.push(v);
    return stack;
})

var stackUnBinder = makeBindFun(function (stack) {
    stack.pop();
    return stack;
})

var dynamicLookup = function (k) {
    var slot = globals[k] || [];
    return _.last(slot)
}
stackBinder('a', 1);
stackBinder('b', 100);
console.log(globals) //{ a: [1],b:[100] }

dynamicLookup('a') //1

stackBinder('a', '*');
dynamicLookup('a')//*
console.log(globals) //{ a: [1,'*'],b:[100] }

stackUnBinder('a');
dynamicLookup('a') //1

// 3.5.1模拟闭包
function whatWasTheLocal() {
    var captured = 'Oh hai';
    return function () {
        return 'the local is:' + captured
    }
}

var reportLocal = whatWasTheLocal();
console.log(reportLocal())//the local is:Oh hai

function createScaleFunction(fatol) {
    return function (v) {
        return _.map(v, function (n) {
            return (n * fatol)
        })
    }
}

var scale10 = createScaleFunction(10)
console.log(scale10([1, 2, 3]))//[10, 20, 30]

function createWriteScaleFunction(fatol) {
    return function (v) {
        this['fatol'] = fatol;
        var caption = this;

        return _.map(v, _.bind(function (n) {
            return (n * this['fatol'])
        }, caption))
    }
}

var scale10_2 = createWriteScaleFunction(10);
console.log(scale10_2.call({}, [5, 6, 7]))//[50, 60, 70]

// 1.自由变量

function makeAdd(caption) {
    return function (free) {
        return free + caption;
    }
}

var add10 = makeAdd(10);
add10(32)//42

var add1024 = makeAdd(1024);

add1024(10)//1034

add10(20)//30   

function averageDamp(fun) {
    return function (n) {
        return average([n, fun(n)])
    }
}

var averageSq = averageDamp(function (n) { return n * n })

function average(arr) {
    return (arr[0] + arr[1]) / 2
}

averageSq(10)//55


// 3.5.2使用闭包
//反转谓词

function complement(pred) {
    return function () {
        return !pred.apply(null, _.toArray(arguments))
    }
}

function isEven(n) {
    return n % 2 == 0
}

var isOdd = complement(isEven)

log(isOdd(2)) //false
log(isOdd(413))//true

//改变isEven后呢
function isEven(n) {
    return false
}

log(isOdd(12)) //false
log(isOdd(13))//true
//同时用于闭包 与外界的对象

function showObject(obj) {
    return function () {
        return obj;
    }
}

var o = { a: 55 }
var showO = showObject(o)
log(showO())//{a:55,b:108}

o.b = 108 //{a:55,b:108}

log(showO());

//定义内部变量来避免泄露
var pingpong = (function () {
    var privite = 0;
    return {
        inc: function (n) {
            return privite += n
        },
        dec: function (n) {
            return privite -= n
        }
    }
})()
log(pingpong.inc(10))
log(pingpong.dec(7))

// pingpong.div = function (n) { return privite / n };
// pingpong.div(3)//privite is not defined

// 3.5.3闭包的0抽象 
function plucker(field) {
    return function (o) {
        return (o && o[field])
    }
}

var best = { title: 'Infinite Jest', anthor: 'DFW' }

var getTitle = plucker('title');
log(getTitle(best))//Infinite Jest

var book = [{ title: 'Chtohn' }, { statrs: 5 }, { title: 'Botchan' }];

var third = plucker(2)
log(third(book))//{title: "Botchan"}

log(_.filter(book, getTitle))//[{ title: 'Chtohn' }, { title: 'Botchan' }];
