//组合对象可以拥有子节点，叶对象下面就没有子节点， 所以我们也许会发生一些误操作，
//比如试图往叶对象中添加子节点。解决方案通常是给叶对象也增加 add 方法，并且在调用这个方
//法时，抛出一个异常来及时提醒客户，代码如下

var MacroCommand = function () {
    return {
        commandList: [],
        add: function (command) {
            this.commandList.push(command)
        },
        execute: function () {
            for (var i = 0, command; command = this.commandList[i++];) {
                command.execute();
            }
        }
    }
}

var openTvCommand = {
    execute: function () {
        console.log('打开电视')
    },
    add: function () {
        throw new Error('叶对象不能添加子节点')
    }
}
var macroCommand = MacroCommand();
macroCommand.add(openTvCommand);
openTvCommand.add(macroCommand) 