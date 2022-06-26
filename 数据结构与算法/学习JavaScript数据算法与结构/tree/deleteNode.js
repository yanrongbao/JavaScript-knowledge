function deleteNode(root, n) {
  if (!root) return root
  if (root.val === n) {
    if (!root.left && !root.right) {
      root = null
    } else if (root.left) {
      const maxNode = findMaxRoot(root);
      root.val = maxNode.val
      root.left = deleteNode(root.left, maxNode.val)
    } else {
      const minNode = findMMinRoot(root)
      root.val = minNode.val
      root.right = deleteNode(root.right, minNode.val)
    }
  } else if (root.val > n) {
    root.left = deleteNode(root.left, n)
  } else {
    root.right = deleteNode(root.right, n)
  }
  return root
}

function findMaxRoot(root) {
  while (root.right) {
    root = root.right
  }

  return root
}
function findMMinRoot(root) {
  while (root.left) {
    root = root.left
  }

  return root
}