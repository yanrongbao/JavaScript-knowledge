// 4.1实现单例模式
var Singleton = function (name) {
    this.name = name;
    this.instance = null;
}
Singleton.prototype.getName = function () {
    return this.name
}
Singleton.getInstance = function (name) {
    if (!this.instance) {
        this.instance = new Singleton(name)
    }
    return this.instance;
}
var a = Singleton.getInstance('seven1');
var b = Singleton.getInstance('seven2');
console.log(a === b);

var CreateDiv = (function () {
    var instacne;
    var CreateDiv = function (html) {
        if (instacne) {
            return instacne;
        }
        this.html = html;
        this.init()

        return instacne = this;
    }
    CreateDiv.prototype.init = function () {
        // var div = document.createElement('div');
        // div.innerHTML = this.html;
        // document.body.appendChild(div);
    }
    return CreateDiv;
})()

var c = new CreateDiv('ccc')
var d = new CreateDiv('ddd')
console.log(c === d)

// 4.3用代理实现单例

var CreateDiv = function (html) {
    this.html = html;
    this.init()
}
CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}
var ProxySingletonCreateDiv = (function () {
    var instacne;
    return function (html) {
        if (!instacne) {
            instacne = new CreateDiv(html)
        }
        return instacne
    }
})()

// 4.4JavaScript中的单例模式
// 1.使用命名空间
var myApp = {};
myApp.namespace = function (name) {
    var parts = name.split(',');
    var current = myApp;
    for (var i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {}
        }
        current = current[parts[i]]
    }
}

myApp.namespace('event');
myApp.namespace('dom.style');
console.log(myApp);

// 2.使用闭包装私有变量
var user = (function () {
    var __name = 'seven', __age = 24;
    return {
        getUserInfo: function () {
            return __name + '-' + __age
        }
    }
})()

// 4.5惰性单例
var createLoginLayer = (function () {
    var div;
    return function () {
        if (!div) {
            div = document.createElement('div');
            div.innerHTML = '我是登录浮窗';
            div.style.display = 'none';
            document.body.appendChild(div);
            return div;
        }
        return div;
    }
})()
document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createLoginLayer();
    loginLayer.style.display = 'block'
}

// 4.6通用的惰性单例
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}