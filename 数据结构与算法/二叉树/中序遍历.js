// 输入: [1,null,2,3]
// 输出: [1,3,2]
// 递归实现
let inorderTraversal = function (root, array = []) {
    if (root) {
        inorderTraversal(root.left, array);
        array.push(root.val);
        inorderTraversal(root.right, array);
    }
    return array;
}

// 非递归实现
let inorderTraversal2 = function (root) {
    const result = [], stack = [];
    let current = root;
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    return result;
}