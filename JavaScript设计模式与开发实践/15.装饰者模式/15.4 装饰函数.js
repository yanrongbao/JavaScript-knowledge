var a = function () {
    alert(1);
}

var _a = a;
a = function () {
    _a();
    alert(2)
}