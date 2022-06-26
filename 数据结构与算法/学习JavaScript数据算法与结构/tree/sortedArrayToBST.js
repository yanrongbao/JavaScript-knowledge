function sortedArrayToBST(nums) {
  if (!nums.length) {
    return null
  }
  const root = buildBFS(0, nums.length - 1)
  function buildBFS(low, high) {
    if (low > high) return null
    const mid = Math.floor(low + (high - low) / 2)
    const cur = new TreeNode(nums[mid])

    cur.left = buildBFS(low, mid - 1)
    cur.right = buildBFS(mid + 1, high)

    return cur
  }

  return root;
}