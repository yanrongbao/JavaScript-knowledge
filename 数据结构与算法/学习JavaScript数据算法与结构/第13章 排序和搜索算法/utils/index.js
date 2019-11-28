const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
}
const Colors = {
    BLACK: 1,
    RED: 2
}

function defaultCompare (a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
function swap (array, a, b) {
    /* const temp = array[a]; 
    array[a] = array[b]; 
    array[b] = temp; */ // 经典方式
    [array[a], array[b]] = [array[b], array[a]]; // ES2015 的方式
}
function defaultEquals (a, b) {
    return a === b;
}


module.exports = {
    defaultCompare,
    Compare,
    swap,
    defaultEquals
}