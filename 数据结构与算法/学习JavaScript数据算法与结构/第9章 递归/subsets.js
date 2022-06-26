/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 入参是一个数组
const subsets = function (nums) {
  const res = [];
  const len = nums.length;
  const cur = []

  bfs(0)

  function bfs(index) {
    res.push(cur.slice())

    for (let i = index; i < len; i++) {
      cur.push(nums[i]);
      bfs(i + 1)
      cur.pop()
    }
  }

  return res
}
console.log(subsets([1, 2, 3]));