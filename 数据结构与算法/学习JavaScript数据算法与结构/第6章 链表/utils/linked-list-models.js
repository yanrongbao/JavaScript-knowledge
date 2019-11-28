module.exports = Node = class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

module.exports = DoublyNode = class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next);
        this.prev = prev;
    }
}