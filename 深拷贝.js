const CLONE_DEEP_FLAG = 1		// 1 即 0001，深拷贝标志位
const CLONE_FLAT_FLAG = 2		// 2 即 0010，拷贝原型链标志位，
const CLONE_SYMBOLS_FLAG = 4	// 4 即 0100，拷贝 Symbols 标志位
function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}
const baseClone = (value,bitmask,customizer,key,object,stack)=>{
    let result // 初始化返回结果，后续代码需要，和位掩码无关
    const isDeep = bitmask & CLONE_DEEP_FLAG 	// 5 & 1 即 1 即 true
    const isFlat = bitmask & CLONE_FLAT_FLAG	// 5 & 2 即 0 即 false
    const isFull = bitmask & CLONE_SYMBOLS_FLAG // 5 & 4 即 4 即 true

    if(customizer){
       result = object?customizer(value,key,object,stack):customizer(value)
    }

    if (result !== undefined) {
        return result
    }

    //判断要拷贝的值是否是对象，非对象直接返回本来的值
    if (!isObject(value)) {
        return value;
    }

    const isArr = Array.isArray(value)
    const hasOwnProperty =  Object.prototype.hasOwnProperty

    if(isArr){
        result = initCloneArray(value)
        if (!isDeep) {
            return copyArray(value, result)
        }
    }
}

// ../isObject.js
function isObject(value) {
    const type = typeof value;
    return value != null && (type == 'object' || type =='function');
}

// 初始化一个数组
function initCloneArray(array){
    const {length} = array
    
    // 构造相同长度的新数组
    const result = new array.constructor(length)
    
      // 正则 `RegExp#exec` 返回的数组
    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index
        result.input = array.input
    }
    return result
}

// 浅拷贝数组
function copyArray(source,array){
    let index = -1
  const length = source.length
  array||(array = new Array(length))
  while(++index < length){
    array[index] = source[index]
  }
  return array
}