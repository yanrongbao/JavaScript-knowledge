//11.2.3 分离出共同点
var Beverage = function () { }
Beverage.prototype.boilWater = function () {
    console.log('把水煮沸')
}
Beverage.prototype.brew = function () { throw new Error('子类必须重写 brew 方法'); };// 空方法，应该由子类重写
Beverage.prototype.pourInCup = function () { throw new Error('子类必须重写 pourInCup 方法'); };// 空方法，应该由子类重写
Beverage.prototype.addCondiments = function () { throw new Error('子类必须重写 addCondiments 方法'); };// 空方法，应该由子类重写
Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
};

//11.2.4 创建 Coffee 子类和 Tea 子类
var Coffee = function () { };
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function () {
    console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子');
}

Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶');
}

var coffee = new Coffee();
coffee.init();


var Tea = function () { };
Tea.prototype = new Beverage();
Tea.prototype.brew = function () {
    console.log('用沸水浸泡茶叶');
};
Tea.prototype.pourInCup = function () {
    console.log('把茶倒进杯子');
};
Tea.prototype.addCondiments = function () {
    console.log('加柠檬');
};
var tea = new Tea();
tea.init();