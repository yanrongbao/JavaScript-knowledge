const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}
const Colors = {
    BLACK: 1,
    RED: 2
}
class Node {
    constructor(key) {
        this.key = key; // 节点值
        this.left = null; // 左侧子节点引用
        this.right = null; // 右侧子节点引用
    }
}
class RedBlackNode extends Node {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED; // {6} 
        this.parent = null; // {7} 
    }
    isRed () {
        return this.color === Colors.RED;
    }
}

function defaultCompare (a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

module.exports = {
    Node,
    defaultCompare,
    Compare,
    RedBlackNode
}