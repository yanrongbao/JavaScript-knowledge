const { defaultCompare, Compare, swap } = require('../utils');
function mergeSort (array, compareFn = defaultCompare) {
    const { length } = array;
    const middle = Math.floor(length / 2);
    const left = mergeSort(array.slice(0, middle), compareFn);
    const right = mergeSort(array.slice(middle, length), compareFn);

    array = merge(left, right, compareFn);

    return array;
}
function merge (left, right, compareFn) {
    let i = 0, j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
        result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++])
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}