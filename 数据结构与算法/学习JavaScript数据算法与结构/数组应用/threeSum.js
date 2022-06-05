function threeSum(sums) {
  const res = []
  let len = sums.length
  sums = sums.sort((a, b) => a - b)
  for (let i = 0; i < len - 2; i++) {
    // 定义左指针
    let j = i + 1;
    // 定义右指针
    let k = len - 1
    if (i > 0 && sums[i] === sums[i - 1]) {
      continue;
    }
    while (j < k) {
      if (sums[i] + sums[j] + sums[k] < 0) {
        j++
        while (j < k && sums[j] === sums[j - 1]) {
          j++
        }
      } else if (sums[i] + sums[j] + sums[k] > 0) {
        k--
        while (j < k && sums[k] === sums[k + 1]) {
          k--
        }
      } else {
        res.push([sums[i], sums[j], sums[k]])
        j++
        k--
        while (j < k && sums[j] === sums[j - 1]) {
          j++
        }

        while (j < k && sums[k] === sums[k + 1]) {
          k--
        }
      }
    }
  }
  return res
}
const nums = [-1, 0, 1, 2, -1, -4]

console.log(threeSum(nums));