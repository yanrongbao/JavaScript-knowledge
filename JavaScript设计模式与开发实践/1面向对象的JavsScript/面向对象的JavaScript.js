// 1.2.1一段多态意思的代码
var makeSound = function (animal) {
    if (animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Dog) {
        console.log('汪汪汪');
    }
}
var Duck = function () { };
var Dog = function () { };
makeSound(new Duck());
makeSound(new Dog());

// 1.2.2对象的多态性

var makeSound = function (animal) {
    animal.sound();
}
var Duck = function () { }
Duck.prototype.sound = function () {
    console.log('嘎嘎嘎');
}

var Dog = function () { }
Dog.prototype.sound = function () {
    console.log('汪汪汪');
}
makeSound(new Duck());
makeSound(new Dog());

var Chicken = function () { }
Chicken.prototype.sound = function () {
    console.log('咯咯咯');
}
makeSound(new Chicken());

// 1.4.1使用克隆的原型欧模式
var Plane = function () {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
}

var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

var clonePlane = Object.create(plane);
console.log(clonePlane)

Object.create = Object.create || function (obj) {
    var F = function () { }
    F.prototype = obj;
    return new F()
}

function Person (name) {
    this.name = name;
}
Person.prototype.getName = function () {
    return this.name
}

var objectFactory = function () {
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    obj.__proto__ = constructor.prototype;
    var ret = Constructor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj
}

var a = objectFactory(Person, 'even');
console.log(a.name)
// console.log(a.getName())

// 1.4.6原型继承的未来
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName () {
        return this.name;
    }
}

class Dogs extends Animal {
    constructor(name) {
        super(name);
    }
    speak () {
        return 'woof'
    }
}

var dog = new Dogs('Scamp');
console.log(dog.getName() + ' says ' + dog.speak())