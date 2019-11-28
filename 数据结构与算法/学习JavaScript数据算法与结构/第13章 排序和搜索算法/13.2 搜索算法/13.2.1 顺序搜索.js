// 冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名
const { defaultEquals } = require('../utils');
const DOES_NOT_EXIST = -1;

function sequentialSearch (array, value, equalsFn = defaultEquals) {
    const { length } = array;
    for (let i = 0; i < length; i++) {
        if (equalsFn(value, array[i])) {
            return i;
        }
    }
    return DOES_NOT_EXIST;
}