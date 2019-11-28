const { defaultToString, ValuePair } = require('./utils');
const LinkedList = require('../第6章 链表/6.1 创建链表');
// 创建更好的散列函数
class HashTableSeparateChaining {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    push (key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key)
            if (this.table[position] == null) {
                this.table[position] = new LinkedList()
            }
            this.table[position].push(new ValuePair(key, value));
            return true;
        }
        return false;
    }
    get (key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }
    remove (key) {
        const position = this.hashCode(key);
        const linkedList = this.table(position);
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current) {
                if (current.element.key === key) {
                    linkedList.removeElem(current.element)
                    if (linkedList.isEmpty()) {
                        delete this.table[position];
                    }
                    return true; // {5}
                }
                current = current.next;
            }
        }
        return false;
    }
    // 创建散列函数
    loseloseHashCode (key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    hashCode (key) {
        return this.loseloseHashCode(key);
    }
}