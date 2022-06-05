export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}
export const Colors = {
    BLACK: 1,
    RED: 2
}
export class RedBlackNode extends Node {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED; // {6} 
        this.parent = null; // {7} 
    }
    isRed() {
        return this.color === Colors.RED;
    }
}

export function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

// module.exports = {
//     Node,
//     defaultCompare,
//     Compare,
//     RedBlackNode
// }