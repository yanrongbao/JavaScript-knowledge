// 6.3虚拟代理实现图片预加载
var myImage = (function() {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function(src) {
      imgNode.src = src;
    }
  };
})();
//增加一个代理模式
var proxyImage = (function() {
  var img = new Image();
  img.onload = function() {
    myImage.setSrc(this.src);
  };

  return {
    setSrc: function(src) {
      myImage.setSrc('../loading.gif');
      img.src = src;
    }
  };
})();
proxyImage.setSrc('http:// imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');
