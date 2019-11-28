const defaultEquals = require('./utils')
const LinkedList = require('./6.1 创建链表');
const DoublyNode = require('./utils/linked-list-models')
class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
    }
    // 在任意位置插入新元素
    insert (element, index) {
        if (index >= 0 && index < this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                if (!this.head) {
                    this.head = node;
                    node.next = this.head;// 新增的
                } else {
                    node.next = current;
                    current = this.getElementAt(this.size());//获取当前元素
                    // 更新最后一个元素
                    this.head = node;//将第一个元素指向新增元素
                    current.next = this.head;//最后一个元素next指向第一个元素
                }
            } else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    // 从任意位置移除元素
    removeAt (index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() == 1) {
                    this.head = undefined;
                } else {
                    const remove = current;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = remove;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}