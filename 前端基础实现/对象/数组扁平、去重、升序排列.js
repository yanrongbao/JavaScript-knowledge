function flat(arr) {
  return Array.from(new Set(arr.flat(Infinity))).sort((a,b)=> a - b));
}
