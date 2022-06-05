import { Compare, defaultCompare } from './utils/index'

import { Node } from '../module/node'

/**
 * 二叉树，只有一个根节点
 * 1、比节点小的值放左边，比节点大的值放右边
 * 2、insert 插入
 * 3、遍历，中序、前序、后续
 * 4、搜索、最小值、最大值
 * 5、删除某个节点
 */
export class BinadarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.root = null
  }

  // 插入
  insert(key) {
    if (this.root === null) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }

  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  // 中序遍历
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }
  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node)
      this.inOrderTraverseNode(node.right, callback)
    }
  }


  // 先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }
  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }


  // 后序遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }
  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node)
    }
  }

  search(key) {
    this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if (node === null) {
      return false
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  min() {
    return this.minNode(this.root)
  }
  minNode(node) {
    let current = node;
    while (current && current.left !== null) {
      current = current.left
    }
    return current
  }
  max() {
    return this.maxNode(this.root)
  }
  maxNode(node) {
    let current = node;
    while (current && current.right !== null) {
      current = current.right
    }
    return current
  }

  remove(key) {
    this.removeNode(this.root, key)
  }
  removeNode(node, key) {
    if (node === null) {
      return null
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      if (node.left === null && node.right === null) {
        node = null
        return node
      } else if (node.left === null) {
        node.right = null
        return node
      } else if (node.right === null) {
        node.left = null
        return node
      } else {
        const aux = this.minNode(node.right)
        node.key = aux.key
        node.right = this.removeNode(node.right, aux.key)
        return node
      }
    }
  }
}

