const DoublyLinkedList = require('./6.2 双向链表');
class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList();
    }
    push (element) {
        this.items.push(element); // {2} 
    }
    pop () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.removeAt(this.size() - 1); // {3} 
    }
    peek () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.getElementAt(this.size() - 1).element;
    }
    isEmpty () {
        return this.items.isEmpty();
    }
    size () {
        return this.items.size();
    }
    clear () {
        this.items.clear();
    }
    toString () {
        return this.items.toString();
    }
}