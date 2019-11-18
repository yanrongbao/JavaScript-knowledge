//6.8.1 缓存代理的例子——计算乘积

var mult = function() {
  console.log('开始计算乘积');
  var a = 1;
  for (let i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }

  return a;
};

//现在加入缓存代理

var proxyMult = (function() {
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return (cache[args] = mult.apply(this, arguments));
  };
})();

proxyMult(1, 20);
proxyMult(1, 20);
