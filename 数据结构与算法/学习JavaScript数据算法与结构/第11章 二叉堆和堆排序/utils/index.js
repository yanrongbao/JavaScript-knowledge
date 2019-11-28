const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
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

module.exports = {
    defaultCompare,
    Compare,
}