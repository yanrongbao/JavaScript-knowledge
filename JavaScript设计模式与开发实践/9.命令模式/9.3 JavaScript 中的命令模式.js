//9.3 JavaScript 中的命令模式

var bindClick = function (button, fun) {
    button.onclick = function () {
        fun()
    }
}
var MenuBar2 = {
    refresh: function () {
        console.log('刷新菜单页面');
    }
}
var SubMenu2 = {
    add: function () {
        console.log('增加子菜单');
    },
    del: function () {
        console.log('删除子菜单');
    }
};
bindClick(button1, MenuBar2.refresh());
bindClick(button2, SubMenu2.add());
bindClick(button3, SubMenu2.del());


//当然，如果想更明确地表达当前正在使用命令模式，或者除了执行命令之外，将来有可能还
//要提供撤销命令等操作。那我们最好还是把执行函数改为调用 execute 方法
var setCommand3 = function (button, command) {
    button.onclick = function () {
        command.execute();
    };
}

var MenuBar3 = {
    refresh: function () {
        console.log('刷新菜单页面');
    }
}

var RefreshMenuBar3 = function (receive) {
    return {
        execute: function () {
            receive.refresh()
        }
    }
}

var refreshMenuBar3 = RefreshMenuBar3(MenuBar3);
setCommand3(botton1, refreshMenuBar3);