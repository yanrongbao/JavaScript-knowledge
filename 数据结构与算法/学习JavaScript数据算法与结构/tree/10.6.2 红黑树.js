const BinarySearchTree = require('./10.3 二叉树和二叉搜索树');
const { RedBlackNode, Compare, defaultCompare, Colors } = require('./utils')
class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
    insert (key) {
        if (this.root == null) {
            this, root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNdoe(this.root, key);
            this.fixTreeProperties(newNode);
        }
    }
    insertNode (node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            } else {
                return this.insertNode(node.left, key);
            }
        } else if (node.right == null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        } else {
            return this.insertNode(node.right, key);
        }
    }
    fixTreeProperties (node) {
        while (node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK) {
            let parent = node.parent;
            // 情形 A：父节点是左侧子节点
            if (grandParent && grandParent.left === parent) {
                const uncle = grandParent.right;
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    // 情形 2A：节点是右侧子节点——左旋转
                    if (node === parent.right) {
                        this.rotationRR(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    // 情形 3A：节点是左侧子节点——右旋转
                    else {
                        this.rotationLL(grandParent);
                        parent.color = Colors.BLACK;
                        grandParent.color = Colors.RED;
                        node = parent;
                    }
                }
            }
            // 情形 B：父节点是右侧子节点
            else {
                const uncle = grandParent.left;
                // 情形 1B：叔节点是红色——只需要重新填色
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    // 情形 2B：节点是左侧子节点——左旋转
                    if (node === parent.left) {
                        this.rotationLL(parent); // {19} 
                        node = parent;
                        parent = node.parent;
                    }
                    // 情形 3B：节点是右侧子节点——左旋转
                    else {
                        this.rotationRR(grandParent); // {20} 
                        parent.color = Colors.BLACK;
                        grandParent.color = Colors.RED;
                        node = parent;
                    }
                }
            }
        }
    }
    rotationLL (node) {
        const tmp = node.left;
        node.left = tmp.right;
        if (tmp.right && tmp.right.key) {
            tmp.right.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        }
        else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            }
            else {
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;
    }
    rotationRR (node) {
        const tmp = node.right;
        node.right = tmp.left;
        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        }
        else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            }
            else {
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }
}