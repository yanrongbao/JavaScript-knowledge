/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = function (root) {
  const res = []
  const stack = []

  let cur = root

  while (cur || stack.length) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }

    cur = stack.pop()

    res.push(cur.val)

    cur = cur.right
  }

  return res
}