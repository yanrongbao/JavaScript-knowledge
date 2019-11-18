//8.4 自定义事件

// 8.5 发布 － 订阅模式的通用实现//
var salesOffices = {};  //定义售楼处
salesOffices.clientList = [];   //缓存列表，存放订阅者的回调函数
salesOffices.listen = function (fn) {   //增加订阅者
    this.clientList.push(fn)
}
salesOffices.trigger = function () {  //发布消息
    for (let i = 0, fn; fn = this.clientList[i++];) {
        fn.apply(this, arguments)
    }
}

salesOffices.listen(function (price, squareMeter) {
    console.log('价格' + price);
    console.log('squareMeter=' + squareMeter);
})
salesOffices.listen(function (price, squareMeter) {
    console.log('价格' + price);
    console.log('squareMeter=' + squareMeter);
})
salesOffices.trigger(2000000, 88);
salesOffices.trigger(3000000, 110);

var salesOffices = {};
salesOffices.clientList = [];
salesOffices.listen = function (key, fn) {
    if (!this.clientList[key]) {
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
}
salesOffices.trigger = function () {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];

    if (!fns || fns.length == 0) {
        return false;
    }
    for (let i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments)
    }
}
salesOffices.listen('squareMeter88', function (price) {
    console.log('价格=' + price)
})
salesOffices.listen('squareMeter110', function (price) {
    console.log('价格=' + price)
})
salesOffices.trigger('squareMeter88', 2000000);

var event = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length == 0) {
            return false;
        }
        for (let i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
}

var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i]
    }
}

var salesOffices2 = {};
installEvent(salesOffices2);
// console.log(salesOffices2)
salesOffices2.listen('squareMeter88', function (price) {
    console.log('价格=' + price)
})
salesOffices2.listen('squareMeter110', function (price) {
    console.log('价格=' + price)
})
salesOffices2.trigger('squareMeter88', 2000000);
salesOffices2.trigger('squareMeter110', 3000000);

//8.6 取消订阅的事件
event.remove = function (key, fn) {
    var fns = this.clientList[key]
    if (!fns) { return false; }//如果 key 对应的消息没有被人订阅，则直接返回
    if (!fn) {// 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
        fns && (fns.length = 0)
    } else {
        for (let l = fns.length - 1; l >= 0; l--) {
            var _fn = fns[l];
            if (_fn == fn) {
                fns.splice(l, 1)// 删除订阅者的回调函数
            }
        }
    }
}

var salesOffices2 = {};
var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
}
installEvent(salesOffices2);

salesOffices2.listen('squareMeter88', fn1 = function (price) {
    console.log('价格=' + price)
})
salesOffices2.listen('squareMeter88', fn2 = function (price) {
    console.log('价格=' + price)
})
salesOffices2.remove('squareMeter88', fn1);
salesOffices2.trigger('squareMeter88', 2000001)

//8.7 真实的例子——网站登录
var login = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!this.clientList[key]) {
            return;
        }
        for (let i = 0; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
}
// $.ajax('http:// xxx.com?login', function (data) {
//     login.trigger('loginSucc', data)
// })

var header = (function () {
    login.listen('loginSucc', function (data) {
        header.setAvatar(data.avatar)
    })
    return {
        setAvatar: function (avatar) {
            console.log('设置 header 模块的头像')
        }
    }
})()

var nav = (function () {
    login.listen('loginSucc', function (data) {
        nav.setAvatar(data.avatar)
    })
    return {
        setAvatar: function (avatar) {
            console.log('设置 nav 模块的头像')
        }
    }
})()

var address = (function () {
    login.listen('loginSucc', function (obj) {
        adress.refresh(obj)
    });
    return {
        refresh: function (avatar) {
            console.log('刷新收货地址列表')
        }
    }
})()

//8.8 全局的发布 － 订阅对象

var Event = (function () {
    var clientList = [],
        listen, trigger, remove;
    listen = function (key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn)
    }

    trigger = function () {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        if (!fns || fns.length == 0) {
            return false
        }
        for (let i = 0; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }

    remove = function (key, fn) {
        var fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            for (let l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn = fn) {
                    fns.splice(l, 1)
                }
            }
        }
    }

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})()

//8.9 模块间通信

// var a = (function () {
//     var a = document.getElementById('a'), count = 0;
//     a.onclick = function () {
//         Event.trigger('add', count++)
//     }
// })()
// var b = (function () {
//     var b = document.getElementById('b');
//     Event.listen('add', function (count) {
//         b.innerHTML = count;
//     })
// })()

// 8.11 全局事件的命名冲突

var Event = (function () {
    var global = this,
        Event,
        _default = 'default';
    Event = function () {
        var _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            namespaceCache = {},
            _create,
            find,
            each = function (ary, fn) {
                var ret;
                for (var i = 0, l = ary.length; i < l; i++) {
                    var n = ary[i];
                    ret = fn.call(n, i, n);
                }
                return ret;
            };
        _listen = function (key, fn, cache) {
            if (!cache[key]) {
                cache[key] = [];
            }
            cache[key].push(fn);
        };
        _remove = function (key, cache, fn) {
            if (cache[key]) {
                if (fn) {
                    for (var i = cache[key].length; i >= 0; i--) {
                        if (cache[key][i] === fn) {
                            cache[key].splice(i, 1);
                        }
                    }
                } else {
                    cache[key] = [];
                }
            }
        };
        _trigger = function () {
            var cache = _shift.call(arguments),
                key = _shift.call(arguments),
                args = arguments,
                _self = this,
                ret,
                stack = cache[key];
            if (!stack || !stack.length) {
                return;
            }
            return each(stack, function () {
                return this.apply(_self, args);
            });
        };
        _create = function (namespace) {
            var namespace = namespace || _default;
            var cache = {},
                offlineStack = [], // 离线事件
                ret = {
                    listen: function (key, fn, last) {
                        _listen(key, fn, cache);
                        if (offlineStack === null) {
                            return;
                        }
                        if (last === 'last') {
                            offlineStack.length && offlineStack.pop()();
                        } else {
                            each(offlineStack, function () {
                                console.log(this)
                                this();
                            });
                        }
                        offlineStack = null;
                    },
                    one: function (key, fn, last) {
                        _remove(key, cache);
                        this.listen(key, fn, last);
                    },
                    remove: function (key, fn) {
                        _remove(key, cache, fn);
                    },
                    trigger: function () {
                        var fn,
                            args,
                            _self = this;
                        _unshift.call(arguments, cache);
                        args = arguments;
                        fn = function () {
                            return _trigger.apply(_self, args);
                        };
                        if (offlineStack) {
                            return offlineStack.push(fn);
                        }
                        return fn();
                    }
                };
            return namespace ?
                (namespaceCache[namespace] ? namespaceCache[namespace] :
                    namespaceCache[namespace] = ret)
                : ret;
        };
        return {
            create: _create,
            one: function (key, fn, last) {
                var event = this.create();
                event.one(key, fn, last);
            },
            remove: function (key, fn) {
                var event = this.create();
                event.remove(key, fn);
            },
            listen: function (key, fn, last) {
                var event = this.create();
                event.listen(key, fn, last);
            },
            trigger: function () {
                var event = this.create();
                event.trigger.apply(this, arguments);
            }
        };
    }();
    return Event;
})();

Event.trigger('click', 1);
Event.listen('click', function (a) {
    console.log(a)
});