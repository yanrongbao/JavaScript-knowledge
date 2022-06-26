/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversal = function (root) {
  const res = []
  if (!root) {
    return res
  }
  const stack = []

  stack.push(root)

  while (stack.length) {
    const cur = stack.pop()
    res.push(cur.val)

    if (cur.right) {
      stack.push(cur.right)
    }
    if (cur.left) {
      stack.push(cur.left)
    }
  }

  return res
}
