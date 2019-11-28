const defaultEquals = require('./utils')
const Node = require('./utils/linked-list-models');
class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn;
    }
    push (element) {
        const node = new Node(element);
        let current;
        if (!this.head) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
    removeAt (index) {
        // 检查越界值
        if (index >= 0 && index < this.count) {
            let current = this.head;
            // 移除第一项
            if (index === 0) {
                this.head = current.next
            } else {
                let previous;
                for (let i = 0; i < index; i++) {
                    previous = current;
                    current = current.next;//移除中间那一项
                }
                // 将 previous 与 current 的下一项链接起来：跳过 current，从而移除它
                previous.next = current.next;
            }
            this.count--; // {9} 
            return current.element;
        }
        return undefined;
    }
    getElementAt (index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }
    remove (index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index == 0) {
                this.head = current.next;
            } else {
                const previous = this.getElementAt(index);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--; // {9} 
            return current.element;
        }
        return undefined;
    }
    //  在任意位置插入元素
    insert (element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element)
            if (index === 0) {// 在第一个位置添加
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
    // indexOf 方法：返回一个元素的位置
    indexOf (element) {
        let current = this.head;
        for (let i = 0; i < this.count && current; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.element;
        }
        return -1;
    }
    removeElem (element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    isEmpty () {
        return this.count === 0;
    }
    size () {
        return this.count;
    }
    getHead () {
        return this.head;
    }
    // toString 方法
    toString () {
        if (this.head == null) {
            return ''
        } else {
            let objString = `${this.head.element}`;
            let current = this.head.next;
            for (let i = i; i < this.size() && current; i++) {
                objString = `${objString},${current.element}`
                current = current.next;
            }
            return objString;
        }
    }
}
const list = new LinkedList();
list.push(15);
list.push(10);
list.push(12);
list.remove(1)

module.exports = LinkedList;