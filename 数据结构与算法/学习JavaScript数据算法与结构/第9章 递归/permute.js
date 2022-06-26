/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 入参是一个数组
const permute = function (nums) {
  const len = nums.length;
  const cur = []
  const res = []
  const visited = {}

  function bfs(nth) {
    if (nth === len) {
      res.push(cur.slice())
      return
    }

    for (let i = 0; i < len; i++) {
      if (!visited[nums[i]]) {
        visited[nums[i]] = 1
        cur.push(nums[i])
        bfs(nth + 1)
        cur.pop()
        visited[nums[i]] = 0
      }
    }
  }

  bfs(0)
  return res
}

console.log(permute([1, 2, 3]));