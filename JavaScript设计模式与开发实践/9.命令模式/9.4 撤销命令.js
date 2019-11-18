var ball = document.getElementById('ball');
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');
var cancelBtn = document.getElementById('cancelBtn')

var MoveCommand = function (receive, pos) {
    this.receive = receive;
    this.pos = pos;
    this.oldPos = null
}
MoveCommand.prototype.execute = function () {
    this.receive.start('left', this.pos, 1000, 'strongEaseOut');
    this.oldPos = this.receive.dom.getBoundingClientRect()[this.receive.propertyName]//记录小球开始移动位置
}
MoveCommand.prototype.undo = function () {
    this.receive.start('left', this.oldPos, 1000, 'strongEaseOut');//回到小球移动前记录的位置
}

var moveCommand;
moveBtn.onclick = function () {
    var animate = new Animate(ball);
    moveCommand = new MoveCommand(animate, pos.value);
    moveCommand.execute();
}
cancelBtn.onclick = function () {
    moveCommand.undo()
}