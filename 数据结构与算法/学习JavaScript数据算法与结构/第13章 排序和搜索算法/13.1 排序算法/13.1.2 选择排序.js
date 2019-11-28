// 选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推
const { defaultCompare, Compare, swap } = require('../utils');
function selectionSort (array, compareFn = defaultCompare) {
    const { length } = array;
    for (let i = 0; i < length - 1; i++) {
        indexMin = i;
        for (let j = i; j < length; j++) {
            if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            swap(array, i, indexMin)
        }
    }
    return array;
}
let arr = [5, 2, 1, 4, 3]
selectionSort(arr)