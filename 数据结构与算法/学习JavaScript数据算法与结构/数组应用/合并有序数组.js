function mergeArr(arr1, arr2) {
  const len1 = arr1.length;
  const len2 = arr2.length
  let m = len1 - 1, n = len2 - 1;
  let k = len1 + len2 - 1;
  while (m >= 0 && n >= 0) {
    if (arr1[m] >= arr2[n]) {
      arr1[k] = arr1[m]
      m--;
    } else {
      arr1[k] = arr2[n]
      n--;
    }
    k--;
  }

  while (n >= 0) {
    arr1[k] = arr2[n]
    n--;
    k--
  }
  return nums1
}
const nums1 = [1, 2, 3]
const nums2 = [2, 5, 6]
//输出: [1, 2, 2, 3, 5, 6]

console.log(mergeArr(nums1, nums2));