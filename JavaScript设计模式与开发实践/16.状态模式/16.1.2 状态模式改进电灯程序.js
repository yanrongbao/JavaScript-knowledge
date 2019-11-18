// OffLightState：
var OffLightState = function (light) {
    this.light = light;
}
OffLightState.prototype.buttonWasPressed = function () {
    console.log('弱光'); // offLightState 对应的行为
    this.light.setState(this.light.weakLightState)// 切换状态到 weakLightState
}
// WeakLightState：
var WeakLightState = function (light) {
    this.light = light;
}
WeakLightState.prototype.buttonWasPressed = function () {
    console.log('强光'); // weakLightState 对应的行为
    this.light.setState(this.light.strongLightState); // 切换状态到 strongLightState
}
// StrongLightState：
var StrongLightState = function (light) {
    this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function () {
    console.log('关灯'); // strongLightState 对应的行为
    this.light.setState(this.light.offLightState); // 切换状态到 offLightState
};
// 接下来改写 Light 类，现在不再使用一个字符串来记录当前的状态，而是使用更加立体化的
// 状态对象。我们在 Light 类的构造函数里为每个状态类都创建一个状态对象，这样一来我们可以
// 很明显地看到电灯一共有多少种状态，代码如下
var Light = function () {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
}
Light.prototype.init = function () {
    var button = document.createElement('button'),
        self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.currState = this.offLightState; // 设置当前状态
    this.button.onclick = function () {
        self.currState.buttonWasPressed();
    }
}
Light.prototype.setState = function (newState) {
    this.currState = newState;
};
var light = new Light();
light.init();