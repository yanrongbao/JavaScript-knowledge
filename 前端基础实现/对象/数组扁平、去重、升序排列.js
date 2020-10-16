function demo(arr) {
  return Array.from(new Set(arr.flat(Infinity))).sort((a,b)=> a - b));
}

// 扁平化
function flatten(array) {
  const result = [];
  for(let i in result) {
    if(Array.isArray(result[i])){
      result.push(flatten(result[i]));
    }else {
      result.push(result[i]);
    }
  }
  return result;
}

//数组去重
//[1,2,2,3]
function unique(array) {
    // res用来存储结果
    var res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, resLen = res.length; j < resLen; j++ ) {
            if (array[i] === res[j]) {
                break;
            }
        }
        // 如果array[i]是唯一的，那么执行完循环，j等于resLen
        if (j === resLen) {
            res.push(array[i])
        }
    }
    return res;
}

function unique(array) {
    // res用来存储结果
    var res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
      if(!_includes(res, array[i])) {
        res.push(array[i])
      }
    }
    return res;
}

//自定义实现includes
function _includes(arr, param, start = 0) {
  const _start = start;
  if(Object.prototype.toString.call(arr) === '[object Array]') throw new Error('参数必须是array类型');
  const { length } = arr;
  if(_start > length) retun false;
  if(_start < 0) {
    _start = (_start + length) < 0? 0 : length;
  }
  
  if (Number.isNaN(param)) {
    for (let i = _start; i < length; i++) {
       if(Number.isNaN(arr[i])) return true;
    } 
  } else {
    for (let i = _start; i < length; i++) {
       if(arr[i] === param) return true;
    } 
  }
  return false;
}

//冒泡排序
function bubble(arr) {
  if(Object.prototype.toString.call(arr) === '[object Array]') throw new Error('参数必须是array类型');
  const _arr = arr;
  const { length } = _arr;
  for(let i = 0; i < length; i++) {
    for(let j = 0; j < length; j++) {
      if(_arr[j] > _arr[j+1]) {
        const element = arr[j];
        _arr[j] = _arr[j+1];
        _arr[j+1] = element;
      }
    }
  }
  return _arr;
}
