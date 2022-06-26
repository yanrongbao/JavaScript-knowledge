function isValidBST(root) {
  function BFS(root, minVal, maxVal) {
    if (!root) return true

    if (root.val <= minVal || root.val >= maxVal) return false

    return BFS(root.left, minVal, root.val) && BFS(root.right, root.val, maxVal)
  }
  return BFS(root, -Infinity, +Infinity)
}