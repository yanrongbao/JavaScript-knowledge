/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function (root) {
  const res = []
  if (!root) {
    return res
  }
  const quene = []
  quene.push(root)

  while (quene.length) {
    const level = []
    const len = quene.length
    for (let i = 0; i < len; i++) {
      const top = quene.shift()
      level.push(top.val)
      if (top.left) {
        quene.push(top.left)
      }
      if (top.right) {
        quene.push(top.right)
      }
    }
    res.push(level)
  }
  return res
}