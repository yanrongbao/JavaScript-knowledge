var arr = ['whisky', 'tango', 'foxtroy'];
_.each(arr, function (word) {
    console.log(word.charAt(0).toUpperCase() + word.substr(1))
})

//多种JavaScript 编程格式

//1.命令式编程

var lyrics = [];
for (var bottles = 99; bottles > 0; bottles--) {
    lyrics.push(bottles + ' bottles of beer on the wall');
    lyrics.push(bottles + ' bottles of bear');
    lyrics.push('Take one down, pass it around');
    if (bottles > 1) {
        lyrics.push((bottles - 1) + 'bottles of beer on the wall.')
    } else {
        lyrics.push('no more bottles of beer on the wall')
    }
}

function lyriscSegment(n) {
    return _.chain([]).push(n + ' bottles of beer on the wall').push(n + ' bottles of bear').push('Take one down, pass it around').tap(function (lyrics) {
        if (n > 1) {
            lyrics.push((n - 1) + 'bottles of beer on the wall.')
        } else {
            lyrics.push('no more bottles of beer on the wall')
        }
    }).value()
}

function sing(start, end, lyricGen) {
    return _.reduce(_.range(start, end, -1), function (acc, n) {
        return acc.concat(lyricGen(n))
    }, [])
}
var song = sing(99, 0, lyriscSegment)
console.log(song)

//基于原型的面向对象编程

var bFun = function () { return this; }
var b = { name: 'b', fun: bFun }
console.log(b.fun())

function Point2D(x, y) {
    this._x = x;
    this._y = y;
}
function Point3D(x, y, z) {
    Point2D.call(this, x, y);
    this._z = z;
}
Point3D(10, -1, 1000);

//2.2.1中心集合编程
_.map({ a: 1, b: 2 }, _.identity);//[1,2]
_.map({ a: 1, b: 2 }, function (v, k) {
    return [k, v]
})//[['a',1],['b',2]]

_.map({ a: 1, b: 2 }, function (v, k, coll) {
    return [k, v, _.keys(coll)]
})//[['a',1,['a',['b']]],['b',2],['a',['b']]

//2.2.2Applicatiive编程的其他实例
// 1.reudceRighjt
var nums = [100, 2, 25];
function div(x, y) { return x / y; };
_.reduce(nums, div); //2
_.reduceRight(nums, div) //0.125

function allOf() {
    return _.reduceRight(arguments, function (truth, f) {
        return truth && f()
    }, true)
}
function anyOf() {
    return _.reduceRight(arguments, function (truth, f) {
        return truth || f()
    }, true)
}
function T() {
    return true;
}
function F() {
    return false;
}
allOf()//true
allOf(T, T)//true
allOf(T, T, F)//false

anyOf()//true
anyOf(T, T)//true
anyOf(T, T, F)//true
anyOf(F, F, F)//false

//2.find
_.find(['a', 'n', '3', 'c'], _.isNumber) //3

// 3.reject
_.reject(['a', 'n', '3', 'c'], _.isNumber)//['a', 'n', 'c']

function comolement(pred) {
    return function () {
        return !pred.apply(null, _.toArray(arguments));
    }
}

_.filter(['a', 'n', '3', 'c'], comolement(_.isNumber));//['a', 'n', 'c']

// 4.all
_.all([1, 2, 3, 4], _.isNumber); //true

// 5.any
_.all([1, 2, 'c', 4], _.isNumber); //false

// 6.sortBy, groupBy,countBy
var people = [{ name: 'rick', age: 30 }, { name: 'jaca', age: 24 }]
_.sortBy(people, function (p) {
    return p.age
})//[{ name: 'jaca', age: 24 },{ name: 'rick', age: 30 }]

var albums = [{ title: 'Sabbth Bloody Sabbath', genre: 'Metal' }, { title: 'Scientist', genre: 'Dub' }, { title: 'Undertwo', genre: 'Metal' },]

_.groupBy(albums, function (p) {
    return p.genre
})//{Metal:[{ title: 'Sabbth Bloody Sabbath', genre: 'Metal' },{ title: 'Undertwo', genre: 'Metal' }],Dub:[ { title: 'Scientist', genre: 'Dub' }]}

_.countBy(albums, function (p) {
    return p.genre
})//{Metal:2,Dub:1}

// 2.2.3定义几个Applicative函数
function existy(x) {
    return x != null;
}
function truthy(x) {
    return x !== false && existy(x);
}

function cat() {
    var head = _.first(arguments);
    if (existy(head)) {
        return head.concat.apply(head, _.rest(arguments))
    } else {
        return [];
    }
}
console.log(cat([1, 2, 3], [4, 5], [6, 7]));

function construct(head, tail) {
    return cat([head], _.toArray(tail));//[1, 2, 3, 4, 5, 6, 7]
}
console.log(construct(42, [1, 2, 3]))//[42, 1, 2, 3]

function mapCat(fun, coll) {
    return cat.apply(null, _.map(coll, fun))
}
var mapCatArr = mapCat(function (e) {
    return construct(e, [','])
}, [1, 2, 3])
console.log(mapCatArr)//[42, 1, 2, 3]

function butLat(coll) {
    return _.toArray(coll).slice(0, -1);
}

function interpose(inter, coll) {
    return butLat(mapCat(function (e) {
        return construct(e, [inter])
    }, coll))
}

console.log(interpose(',', [1, 2, 3]))

// 2.3数据思考
var zooms = { name: 'bub', film: 'Day of the Dead' };
console.log(_.keys(zooms));//["name", "film"]
console.log(_.values(zooms));//["bub", "Day of the Dead"]
var result = _.pluck([{ title: 'Chthon', author: 'Anthony' }, { title: 'Grendel', author: 'Gardner' }, { title: 'After Dark' },], 'author');
console.log(result)//["Anthony", "Gardner", undefined]
console.log(_.pairs(zooms))//[['name':bub],['film': 'Day of the Dead']]

var objects = _.object(_.map(_.pairs(zooms), function (pair) {
    return [pair[0].toUpperCase(), pair[1]]
}))
console.log(objects) //{NAME: "bub", FILM: "Day of the Dead"}

var invites = _.invert(zooms);
console.log(invites)//{bub: "name", Day of the Dead: "film"}

_.pluck(_.map([{ name: 'sd', title: 'fadf' }, { name: 'ssd', title: 'fadf' }, { title: 'fadf' }], function (res) {
    return _.defaults(res, { name: 'ddd' })
}), 'name')//["sd", "ssd", "ddd"]

var person = { name: 'yrb', age: '23', girlfirend: 'hhf' };
var info = _.omit(person, 'age', 'girlfirend');
console.log(info)//{name: "yrb"}

var creds = _.pick(person, 'age', 'girlfirend')
console.log(creds)//{age: "23", girlfirend: "hhf"}

var library = [{ title: 'SICP', isbn: '2096454', ed: 1 }, { title: 'SICP', isbn: '98726', ed: 2 }, { title: 'SIARF', isbn: '71665', ed: 3 }]
console.log(_.findWhere(library, { title: 'SICP', ed: 2 }))//{title: "SICP", isbn: "98726", ed: 2}
console.log(_.where(library, { title: 'SICP' }))//[{title: "SICP", isbn: "2096454", ed: 1},{title: "SICP", isbn: "98726", ed: 2}]

//函数project 类似于SQL select选取
function project(table, keys) {
    return _.map(table, function (obj) {
        return _.pick.apply(null, construct(obj, keys))
    })
}
var editionResults = project(library, ['title', 'isbn'])
console.log(editionResults)//[{title:"SICP",isbn:"2096454"},{isbn:"98726",title:"SICP"},{isbn:"71665",title:"SIARF"}]

function rename(obj, newNames) {
    return _.reduce(newNames, function (o, nu, old) {
        console.log(o, nu, old); // o {AAA:1,b:2} nu: AAA old:a
        if (_.has(obj, old)) {
            o[nu] = obj[old];
            return o;
        } else {
            return o;
        }
    },
        _.omit.apply(null, construct(obj, _.keys(newNames))))
}

console.log(rename({ a: 1, b: 2 }, { a: 'AAA' })); //{AAA: 1, b: 2 }

function as(table, newNames) {
    return _.map(table, function (obj) {
        return rename(obj, newNames)
    })
}
console.log(as(library, { ed: 'edition' }));//[{ title: 'SICP', isbn: '2096454', edition: 1 }, { title: 'SICP', isbn: '98726', edition: 2 }, { title: 'SIARF', isbn: '71665',edition: 3 }]

function restrict(table, pred) {
    return _.reduce(table, function (newTable, obj) {
        if (truthy(pred(obj))) {
            return newTable
        } else {
            return _.without(newTable, obj)
        }
    }, table)
}
var sss = restrict(library, function (book) {
    return book.ed > 1
})
console.log(sss)//[ { title: 'SICP', isbn: '98726', ed: 2 }, { title: 'SIARF', isbn: '71665',ed: 3 }]

var ddd = restrict(project(as(library, { ed: 'edition' }), ['title', 'edition', 'isbn']), function (book) {
    return book.edition > 1
});
console.log(ddd)//[ { title: 'SICP', isbn: '98726', edition: 2 }, { title: 'SIARF', isbn: '71665',edition: 3 }]