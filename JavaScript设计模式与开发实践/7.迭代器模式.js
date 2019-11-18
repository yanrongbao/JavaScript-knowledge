// 7.2实现自己的迭代器
var each = function (ary, callback) {
    for (let i = 0, l = ary.length; i < l; i++) {
        callback.call(ary[i], i, ary[i])
    }
}
each([1, 2, 3], function (i, n) {
    console.log(i, n)
})

//7.3 内部迭代器和外部迭代器

//2. 外部迭代器
var Iterator = function (obj) {
    var current = 0;
    var next = function () {
        current++
    }
    var isDone = function () {
        return current >= obj.length;
    }

    var getCurrItem = function () {
        return obj[current]
    }
    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
}

var comparse = function (iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
            throw new Error('iterator1 和 iterator2 不相等');
        }
        iterator1.next();
        iterator2.next();
    }
    console.log('iterator1 和 iterator2 相等')
}

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3]);

comparse(iterator1, iterator2);

//7.6 中止迭代器
var each = function (ary, callback) {
    for (let i = 0, l = ary.length; i < l; i++) {
        if (callback(i, ary[i]) === false) {
            // break;
        }
    }
}
each([1, 2, 3, 4, 5], function (i, n) {
    if (n > 3) {
        return false;
    }
    console.log(n)
})