function defaultToString (item) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString () {
        return `[#${this.key}:${this.value}]`
    }
}
module.exports = {
    defaultToString,
    ValuePair
};