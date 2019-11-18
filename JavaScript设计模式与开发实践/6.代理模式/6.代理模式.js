

var ajaxData = function(url, method, data) {
  console.log('请求数据');
  var xhr = new XMLHttpRequest();
  xhr.open(url, method);
  if (xhr.onreadystatechange == 4 && xhr.readyState == 2) {
    return xhr.responseText;
  }
  xhr.send(data);
};

var proxyAjaxData = (function() {
  var cache = {};
  return function() {
    var fn = arguments.pop();
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      fn(cache[args]);
    }
    return (cache[args] = ajaxData.apply(this, arguments));
  };
})();

proxyAjaxData('/login', 'post', { userName: 'aaa', password: '5555' }, function(
  resp
) {});

//6.9 用高阶函数动态创建代理
var plus = function() {
  console.log('开始计算乘积');
  var a = 0;
  for (let i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i];
  }

  return a;
};
/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = (function(fn) {
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return (cache[args] = fn.apply(this, arguments));
  };
})();
