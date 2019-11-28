// 冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名
const { defaultCompare, Compare } = require('../utils');
const { quickSort } = require('../13.1 排序算法/13.1.5 快速排序')
const DOES_NOT_EXIST = -1;

function binarySearch (array, value, compareFn = defaultCompare) {
    const sortedArray = quickSort(array);
    let low = 0, high = sortedArray.length - 1;
    while (lesserOrEquals(low, high, compareFn)) {
        const mid = Math.floor((low + high) / 2);
        const element = sortedArray[mid];
        if (compareFn(element, value) === Compare.LESS_THAN) {
            low = mid + 1;
        } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return DOES_NOT_EXIST;
}
function lesserOrEquals (a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}