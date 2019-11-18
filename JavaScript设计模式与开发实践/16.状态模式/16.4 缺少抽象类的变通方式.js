var State = function () { };
State.prototype.buttonWasPressed = function () {
    throw new Error('父类的 buttonWasPressed 方法必须被重写');
};
var SuperStrongLightState = function (light) {
    this.light = light;
};
SuperStrongLightState.prototype = new State(); // 继承抽象父类
SuperStrongLightState.prototype.buttonWasPressed = function () { // 重写 buttonWasPressed 方法
    console.log('关灯');
    this.light.setState(this.light.offLightState);
};