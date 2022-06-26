/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = function (root) {

  if (!root) {
    return root
  }
  const left = invertTree(root.left)
  const right = invertTree(root.right)

  root.left = right
  root.right = left

  return root
}