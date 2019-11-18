// 5.6表单校验
// var Validator = function () {
//     this.cache = [];//保存校验规则
// }
// Validator.prototype.add = function (dom, rule, errorMsg) {
//     var ary = rule.split(':')
//     this.cache.push(function () {
//         var strategy = ary.shift();
//         ary.unshift(dom.value);
//         ary.push(errorMsg);
//         return strategies[strategy].apply(dom, ary)
//     })
// }
// Validator.prototype.start = function () {
//     for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
//         var msg = validatorFunc();
//         if (msg) {
//             return msg;
//         }
//     }
// }

// 5.6.3给某个文本框输入多种校验规则

/*************************策略对象 ***********************/
var strategies = {
  isNonEmpty: function(value, errorMsg) {
    if (value == '') {
      return errorMsg;
    }
  },
  minLength: function(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
};

/*************************Validator类 ***********************/
var Validator = function() {
  this.cache = [];
};
Validator.prototype.add = function(dom, rules) {
  var self = this;
  for (let i = 0, rule; (rule = rules[i++]); ) {
    (function(rule) {
      var strateAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;
      self.cache.push(function() {
        var strategy = strateAry.shift();
        strateAry.unshift(dom.value);
        strateAry.push(errorMsg);
        return strategies[strategy].apply(dom, strateAry);
      });
    })(rule);
  }
};
Validator.prototype.start = function() {
  for (let i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
    var errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg;
    }
  }
};
var registerForm = document.getElementById('registerForm');
var validatorFunc = function() {
  var validator = new Validator();
  validator.add(registerForm.userName, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空'
    },
    {
      strategy: 'minLength:6',
      errorMsg: '用户名长度不能小于10位'
    }
  ]);

  var errorMsg = validator.start();
  return errorMsg;
};

document.getElementById('btn').onclick = function() {
  var errorMsg = validatorFunc();
  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
};
