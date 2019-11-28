const {
    defaultCompare,
    Compare,
    Node
} = require('./utils');
// 10.3.1 创建 BinarySearchTree 类
class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null;
    }
    // 向二叉搜索树中插入一个键
    insert (key) {
        if (this.root === null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    insertNode (node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }
    // 中序遍历
    inOrderTraverse (callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode (node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    // 先序遍历
    preOrderTraverse (callback) {
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode (node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    // 后序遍历
    postOrderTraverse (callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode (node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key)
        }
    }
    min () {
        return this.minNode(this.root);
    }
    minNode (node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }
    max () {
        return this.maxNode(this.root);
    }
    maxNode (node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }
    search (key) {
        return this.searchNode(this.root, key);
    }
    searchNode (node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }
    // 移除一个节点
    remove (key) {
        this.root = this.removeNode(this.root, key);
    }
    removeNode (node, key) {
        if (node == null) {
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (
            this.compareFn(key, node.key) === Compare.BIGGER_THAN
        ) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            // 键等于 node.key 
            // 第一种情况
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            // 第三种情况
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }
}
exports.BinarySearchTree = BinarySearchTree;
const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
// const printNode = (value) => console.log(value); // {6}
// tree.postOrderTraverse(printNode);
// console.log(tree.min(), tree.max())
// console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
// console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');