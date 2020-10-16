function _new(origin,...arg) {
  const obj = Object.create(origin.prototype);
  const result = origin.apply(obj, arg);
  return Object.prototype.toString.call(result) == '[object Object]'? result : obj;
}
