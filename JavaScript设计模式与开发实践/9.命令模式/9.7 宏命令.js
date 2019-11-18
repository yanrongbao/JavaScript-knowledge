var closeDoorCommand = {
    execute: function () {
        console.log('关上门')
    }
}
var openPcCommand = {
    execute: function () {
        console.log('开电脑')
    }
}
var openQQCommand = {
    execute: function () {
        console.log('登录QQ')
    }
}

var MacroCommand = function () {
    return {
        commandList: [],
        add: function (command) {
            this.commandList.push(command);
        },
        execute: function () {
            for (var i = 0, command; command = this.commandList[i++];) {
                command.execute();
            }
        }
    }
}

var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
macroCommand.execute()