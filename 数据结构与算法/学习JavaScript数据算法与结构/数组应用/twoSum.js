// 例子 const arr = [2,4,8,124,69,1,5]求和为10的两个下标值


const arr = [2, 4, 8, 124, 69, 1, 5];

function twoSumo(arr, total) {
  const diff = {}
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const element = arr[i];
    const redece = total - element
    if (diff[redece] !== undefined) {
      return [diff[redece], i]
    } else {
      diff[element] = i
    }
  }
}
function twoSumMap(arr, total) {
  const map = new Map()
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const element = arr[i];
    const redece = total - element
    if (map.has(redece)) {
      return [map.get(redece), i]
    } else {
      map.set(element, i)
    }
  }
}

console.log(twoSumMap(arr, 10));