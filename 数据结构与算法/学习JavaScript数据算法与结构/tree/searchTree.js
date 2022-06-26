function search(root, n) {
  if (!root) {
    return null
  }
  if (root.val === n) {
    return root
  }
  if (root.val > n) {
    search(root.left, n)
  }

  if (root.val < n) {
    search(root.right, n)
  }
}

function insertIntoBST(root, n) {
  if (!root) {
    root = new TreeNode(n)
    return root
  }

  if (root.val < n) {
    root.right = insertIntoBST(root.right, n)
  } else {
    root.left = insertIntoBST(root.left, n)
  }


  return root
}