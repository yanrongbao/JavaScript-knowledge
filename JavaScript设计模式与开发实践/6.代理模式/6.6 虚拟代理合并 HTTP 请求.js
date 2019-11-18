// 6.6虚拟代理合并HTTP请求
var synchronousFile = function(id) {
  console.log('开始同步文件,id为:' + id);
};

var proxySynchronousFile = (function() {
  var cache = [],
    timer;

  return function(id) {
    cache.push(id);
    if (timer) {
      return;
    }
    timer = setTimeout(function() {
      synchronousFile(cache.join(','));
      clearTimeout(timer);
      timer = null;
      cache.length = 0;
    }, 2000);
  };
})();
