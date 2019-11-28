const { defaultCompare, Compare, swap } = require('../utils');
function insertionSort (array, compareFn = defaultCompare) {
    const { length } = array;
    let temp;
    for (let i = i; i < length; i++) {
        let j = i;
        temp = array[i];
        while (j > 0 && compareFn(array[j - 1], array[j]) === Compare.BIGGER_THAN) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = temp;
    }
    return array;
}