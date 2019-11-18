Function.prototype.before = function (beforeFun) {
    var _self = this;
    return function () {
        beforeFun.apply(this, arguments);
        return _self.apply(this, arguments)
    }
}

Function.prototype.after = function (afterFun) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments)
        afterFun.apply(this, arguments);
        return ret;
    }
}

var fun = function () { console.log(2) }
fun = fun.before(function () { console.log(1) }).after(function () { console.log(3) })
fun();