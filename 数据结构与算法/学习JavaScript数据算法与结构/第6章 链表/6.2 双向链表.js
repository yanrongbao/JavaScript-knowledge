const defaultEquals = require('./utils')
const LinkedList = require('./6.1 创建链表');
const DoublyNode = require('./utils/linked-list-models')
class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;
    }
    // 在任意位置插入新元素
    insert (element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {// 新增的
                if (!this.head) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            } else if (index == this.count) { // 最后一项 // 新增的
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }
    // 从任意位置移除元素
    removeAt (index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head;
            if (index == 0) {
                this.head = current.next;
                // 如果只有一项，更新 tail // 新增的
                if (this.count === 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined
                }
            } else if (index === this.count - 1) { // 最后一项 //新增的
                current = this.tail;
                this.tail = current.next;
                this.tail.next = undefined;
            } else {
                current = this.getElementAt(index);
                const previous = current.prev;
                previous.next = current.next;
                current.prev.next = previous;//将移除的下一个元素的 前面一个元素指向 当前元素的前一个元素
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}
const dDoublyLinkedList = new DoublyLinkedList()
dDoublyLinkedList.push(15);
dDoublyLinkedList.push(14);
dDoublyLinkedList.push(13);
console.log(dDoublyLinkedList.head)

module.exports = DoublyLinkedList;