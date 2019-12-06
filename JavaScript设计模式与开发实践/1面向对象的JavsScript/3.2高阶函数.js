// 1. 回调函数
var getUserInfo = function (userId, callback) {
    $.ajax('http://xxx.com/getUserInfo?' + userId, function (data) {
        if (typeof callback === 'function') {
            callback(data)
        }
    })
}
getUserInfo(13157, function (data) {
    alert(data.userName);
});

var append = function (callback) {
    for (var i = 0; i < 100; i++) {
        var div = document.createElement('div');
        div.innerHTML = i;
        document.body.append(div);
        if (typeof callback === 'function') {
            callback(div);
        }
    }
}
append(function (node) {
    node.style.display = 'none';
})

var isType = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
}
var isString = isType('String');
var isArray = isType('Array');
var isNumber = isType('Number');