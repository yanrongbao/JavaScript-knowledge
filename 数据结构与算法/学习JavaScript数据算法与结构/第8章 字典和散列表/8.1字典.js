const { defaultToString, ValuePair } = require('./utils');

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {}
    }
    // 检测一个键是否存在于字典中
    has (key) {
        return this.table[this.toStrFn(key)] !== null;
    }
    set (key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    remove (key) {
        if (this.has(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    //  从字典中检索一个值
    get (key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    keyValues () {
        const valuePairs = [];
        for (const key in this.table) {
            if (this.has(key)) {
                valuePairs.push(this.table[key])
            }
        }
        return valuePairs;
    }
    keys () {
        return this.keyValues().map(valuePair => valuePair.key)
    }
    values () {
        return this.keyValues().map(valuePair => valuePair.value)
    }
    forEach (callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }
    size () {
        return Object.keys(this.table).length;
    }
    isEmpty () {
        return this.size() === 0;
    }
    clear () {
        this.table = {};
    }
    toString () {
        if (this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;
        }
        return objString;
    }
}
const dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');
console.log(dictionary.has('Gandalf'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('Tyrion'));
dictionary.remove('John');
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.keyValues());
dictionary.forEach((k, v) => {
    console.log('forEach: ', `key: ${k}, value: ${v}`);
});