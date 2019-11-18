// 使用 es6 语法
// class B {
//     constructor(opt) {
//         this.Bname = opt.name
//     }
// }
// class A extends B {
//     constructor() {
//         // 向父类传参
//         super({ name: 'B' });
//         // this 必须在 super() 下面使用
//         console.log(this);
//     }
// }

// 使用 es5 语法

// 使用寄生组合继承的方式

// 原型链继承，使子类可以调用父类原型上的方法和属性
// 借用构造函数继承，可以实现向父类传参
// 寄生继承，创造干净的没有构造方法的函数，用来寄生父类的 prototype

// 实现继承，通过继承父类 prototype
function __extends (child, parent) {
    // 修改对象原型
    Object.setPrototypeOf(child, parent);
    // 寄生继承，创建一个干净的构造函数，用于继承父类的 prototype
    // 这样做的好处是，修改子类的 prototype 不会影响父类的 prototype
    function __ () {
        // 修正 constructor 指向子类
        this.constructor = child;
    }
    // 原型继承，继承父类原型属性，但是无法向父类构造函数传参
    child.prototype = parent === null ? Object.create(parent) : ((__.prototype = parent.prototype), new __());
}

var B = (function () {
    function B (opt) {
        this.name = opt.name;
    }
    return B;
})();

var A = (function (__super) {
    __extends(A, __super);
    function A () {
        // 借用继承，可以实现向父类传参, 使用 super 可以向父类传参
        return (__super !== null && __super.apply(this, [{ name: 'B' }])) || this;
    }
    return A;
})(B)
const a = new A();
console.log(a.name, a.constructor); // B ,ƒ A() {}