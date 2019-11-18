
function split(fun) {
    return function (arr) {
        return fun.apply(null, arr);
    }
}
var addArrayElements = split(function (x, y) { return x + y; })

addArrayElements([1, 2])

function unsplat(fun) {
    return function () {
        return fun.call(null, _.toArray(arguments))
    }
}
// 1.2.2 以函数为抽象单位
function parseAge(age) {
    if (!_.isString(age)) throw new Error('Expecting a string');
    var a;
    console.log('Attemping to parse an age');

    a = parseInt(age, 10);
    if (_.isNaN(a)) {
        console.log(['could not parse age:', age].join(' '))
        a = 0;
    }
    return a;
}
// console.log(parseAge('42'));
// console.log(parseAge(42));
// console.log(parseAge('frob'));

function fail(thing) {
    throw new Error(thing)
}
function warn(thing) {
    console.log(['WARNING:', thing].join(' '))
}
function note(thing) {
    console.log(['NOTE:', thing].join(' '))
}
function parseAgeTwo(age) {
    if (!_.isString(age)) fail('Expecting a string');
    var a;
    note('Attemping to parse an age');
    a = parseInt(age, 10);
    if (_.isNaN(a)) {
        warn(['Could not parse age:', age].join(' '));
        a = 0;
    }
    return a;
}
console.log(parseAgeTwo('frob'))
// 1.2.4以函数行为为单位   
var letter = ['a', 'b', 'c']
function naiveNth(a, index) {
    return a[index];
}

// isIndexed函数 判断索引是什么数据类型
function isIndexed(data) {
    return _.isArray(data) || _.isString(data);
}

function nth(a, index) {
    if (!_.isNumber(index)) fail('Expected a number ad the index');
    if (!isIndexed(a)) fail('Not supported on non-indexed type');
    if ((index < 0) || (index > a.length - 1))
        fail('Index value is out of bounds');
    return a[index];
}
console.log(nth(letter, 1))

function second(a) {
    return nth(a, 1)
}
console.log(second(['a', 'b']))
console.log(second('fogus'))

var numArr = [2, 3, -1, -6, 0, -108, 43, 10];

function comparseLessThanOrEqual(x, y) {
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
}
numArr.sort(comparseLessThanOrEqual)
console.log(numArr);
function lessOrEqual(x, y) {
    return x <= y;
}
var numArr2 = [2, 3, -1, -6, 0, -108, 43, 10];
numArr2.sort(lessOrEqual)
console.log(numArr2)

var jsinElements = unsplat(function (array) { return array.join(' ') })
console.log(jsinElements(1, 2));
console.log(jsinElements('-', '$', '/', '!'))
// 1.2.5数据抽象
// 编写函数程序来处理逗号分隔(CSV)值
function lameSCV(str) {
    return _.reduce(str.split('\n'), function (table, row) {
        table.push(_.map(row.split(','), function (n) { return n.trim() }))
        return table;
    }, [])
}
var peopleTable = lameSCV('name,age,hair\nMember,35,red\nnBob,64,blone');
console.log(peopleTable)

console.log(_.rest(peopleTable))//_.rest  返回除第一个数之外的数

function selectName(table) {
    return _.rest(_.map(table, _.first))
}

function selectAges(table) {
    return _.rest(_.map(table, second))
}

function selectHairColor(table) {
    return _.rest(_.map(table, function (row) {
        return nth(row, 2)
    }))
};

console.log(selectName(peopleTable));
console.log(selectAges(peopleTable));
console.log(selectHairColor(peopleTable));

var mergeResults = _.zip;
console.log(mergeResults(selectName(peopleTable), selectAges(peopleTable)))

// 1.2.6以函数式Javascript初式

function existy(x) {
    return x != null;
}
function truthy(x) {
    return x !== false && existy(x);
}

function doWhen(cond, action) {
    if (truthy(cond)) {
        return action();
    } else {
        return false;
    }

}
function executeIfHasField(target, name) {
    return doWhen(existy(target[name]), function () {
        console.log(target[name])
        var result = _.result(target, name);
        console.log(['the result is', result].join(' '))
        return result;
    })
}

console.log(executeIfHasField([1, 2, 3], 'reverse'))
console.log(executeIfHasField({ foo: 42 }, 'foo'))
[null, undefined, false, 1, 2].map(existy)
[null, undefined, false, 1, 2].map(truthy)

// function invoker(name, method) {
//     return function (target) {
//         if ()
//     }
// }