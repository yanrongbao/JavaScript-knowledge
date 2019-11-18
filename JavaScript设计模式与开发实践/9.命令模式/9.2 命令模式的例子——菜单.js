//9.2 命令模式的例子——菜单程序

var setCommand = function (button, command) {
    button.onclick = function () {
        command.execute();
    }
}

var MenuBar = {
    refresh: function () {
        console.log('刷新菜单目录')
    }
}

var SunMenu = {
    add: function () {
        console.log('增加子菜单')
    },
    del: function () {
        console.log('删除子菜单')
    },
}

var RefreshMenuBarCommand = function (receive) {
    this.receive = receive;
}
RefreshMenuBar.prototype.execute = function () {
    this.receive.refresh();
}

var AddSubMenuCommand = function (receive) {
    this.receive = receive;
}
AddSubMenuCommand.prototype.execute = function () {
    this.receive.add();
}
var DelSubMenuCommand = function (receive) {
    this.receive = receive;
}
DelSubMenuCommand.prototype.execute = function () {
    this.receive.del();
}

var refreshMenuBar = new RefreshMenuBar(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SunMenu);
var delSubMenuCommand = new DelSubMenuCommand(SunMenu);

setCommand(button1, refreshMenuBar);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);
