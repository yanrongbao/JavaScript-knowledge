class Set {
    constructor() {
        this.items = {};
    }
    has (element) {
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    add (element) {
        if (!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }
    delete (element) {
        if (this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }
    clear () {
        this.items = {};
    }
    size () {
        // return Object.keys(this.items).length;
        let count = 0;
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                count++
            }
        }
        return count;
    }
    values () {
        // return Object.values(this.items);
        let values = [];
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                values.push(key)
            }
        }
        return values;
    }
}
const set = new Set();
set.add(1);
console.log(set.values())
console.log(set.has(1)); // 输出 true
console.log(set.size()); // 输出 1
set.add(2);
set.delete(1);
console.log(set.values()); // 输出[2]
set.delete(2);
console.log(set.values()); // 输出[]