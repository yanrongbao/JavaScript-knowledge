//6.7 虚拟代理在惰性加载中的应用

var miniConsole = (function() {
  var cache = [];
  var handle = function(ev) {
    if (ev.keyCode == 113) {
      var script = document.createElement('script');
      script.onload = function() {
        for (let i = 0, fn; (fn = cache[i++]); ) {
          fn();
        }
      };

      script.src = 'miniConsole.js';
      document.getElementsByTagName('head')[0].appendChild(script);
      document.removeEventListener('keydown', handle, false);
    }
  };
  document.addEventListener('keydowm', handle, false);

  return {
    log: function() {
      var args = arguments;
      cache.push(function() {
        return miniConsole.log.apply(miniConsole, args);
      });
    }
  };
})();
