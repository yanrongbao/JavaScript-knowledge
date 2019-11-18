// 16.1.1 第一个例子：电灯程序
var Light = function () {
    this.state = 'off'; // 给电灯设置初始状态 off
    this.button = null; // 电灯开关按钮
};
// 接下来定义 Light.prototype.init 方法，该方法负责在页面中创建一个真实的 button 节点，
// 假设这个 button 就是电灯的开关按钮，当 button 的 onclick 事件被触发时，就是电灯开关被按下
// 的时候，代码如下
Light.prototype.init = function () {
    var button = document.createElement('button'),
        self = this;
    button.innerHTML = '开关';
    this.button = document.body.appendChild(button);
    this.button.onclick = function () {
        self.buttonWasPressed();
    }
};
Light.prototype.buttonWasPressed = function () {
    if (this.state === 'off') {
        console.log('开灯');
        this.state = 'on';
    } else if (this.state === 'on') {
        console.log('关灯');
        this.state = 'off';
    }
};
var light = new Light();
light.init();