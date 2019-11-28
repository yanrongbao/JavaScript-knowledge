const { defaultToString, ValuePair } = require('./utils');
const LinkedList = require('../第6章 链表/6.1 创建链表');
class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    push (key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    get (key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    remove (key) {
        const hash = this.hashCode(key); // {1} 
        const valuePair = this.table[hash]; // {2} 
        if (valuePair != null) {
            delete this.table[hash]; // {3} 
            return true;
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
const hash = new HashTable();
hash.push('Gandalf', 'gandalf@email.com');
hash.push('John', 'johnsnow@email.com');
hash.push('Tyrion', 'tyrion@email.com');
console.log(hash.hashCode('Gandalf') + ' - Gandalf');
console.log(hash.hashCode('John') + ' - John');
console.log(hash.hashCode('Tyrion') + ' - Tyrion');

console.log(hash.get('Gandalf')); // gandalf@email.com 
console.log(hash.get('Loiane')); // undefined

hash.remove('Gandalf');
console.log(hash.get('Gandalf'));

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