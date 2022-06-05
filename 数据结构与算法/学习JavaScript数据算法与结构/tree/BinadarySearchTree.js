import { Compare, defaultCompare } from './utils/index'

import { Node } from '../module/node'

export default class BinadarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.root = null // node 类型根节点
  }

  insert(key) {
    // 二叉搜索树插入存在两种情况
    // 1. 插入的节点是根节点 2.插入的节点不是根节点
    if (this.root === null) {
      this.root = new Node(key);
    } else {
      // 如果插入的不是根节点，则需要和相应的节点做比较
      this.insertNode(this.root, key);
    }
  }

  // 插入节点值需要和node节点做比较，
  insertNode(node, key) {
    // 如果插入值比当前节点小，那么需要在左边去插入
    if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
      // 如果当前左节点为null，就赋值给左节点
      if (node.left === null) {
        node.left = new Node(key);
      } else {
        // 如果当前左节点不为null，就接着与当前左节点左比较
        this.insertNode(node.left, key)
      }
    } else {
      // 如果插入值比当前节点大，需要在右边插入
      // 如果右边节点没有值 就赋值给右节点，否则就与右边节点做比较
      if (node.right === null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  // 中序遍历，上行访问所有BST节点的方式
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(node, callback)
  }

  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  // 先序遍历，优先于后代访问所有节点
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(node, callback)
  }

  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  // 后序遍历，先访问节点的后代
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(node, callback)
  }

  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  // 搜索树中最小值
  min() {
    return this.minNode(this.root);
  }

  minNode(node) {
    let current = node
    while (current !== null && current.left !== null) {
      current = current.left
    }
    return current
  }

  // 搜索树中最大值
  max() {
    return this.maxNode(this.root);
  }

  maxNode(node) {
    let current = node
    while (current !== null && current.right !== null) {
      current = current.right
    }
    return current
  }

  // 搜索二叉树值
  search(key) {
    this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if (node === null) return false
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  // 删除子节点
  remove(key) {
    this.removeNode(this.root, key)
  }

  removeNode(node, key) {
    if (node === null) {
      return null
    }
    if (this.compareFn(key, node.left) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.left) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right.key)
      return node
    } else {
      if (node.left === null && node.right === null) {
        node = null
        return node
      } else if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }
      const aux = this.minNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}

const tree = new BinadarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)
console.log(tree);