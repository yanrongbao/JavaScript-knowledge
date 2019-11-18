var MacroCommand = function () {
    return {
        commandList: [],
        add: function (command) {
            this.commandList.push(command)
        },
        execute: function () {
            for (var i = 0, command; command = this.commandList[i++];) {
                command.execute()
            }
        }
    }
}
/**********家里的电视和音响是连接在一起的，所以可以用一个宏命令来组合打开电视和打开音响的命令
*********/
var openAcCommand = {
    execute: function () {
        console.log('打开空调');
    }
};

var openTvCommand = {
    execute: function () {
        console.log('打开电视');
    }
};

var openSoundCommand = {
    execute: function () {
        console.log('打开音响');
    }
};

var macroCommand1 = MacroCommand();
macroCommand1.add(openAcCommand);
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);


/*********关门、打开电脑和打登录 QQ 的命令****************/
var closeDoorCommand = {
    execute: function () {
        console.log('关门');
    }
};
var openPcCommand = {
    execute: function () {
        console.log('开电脑');
    }
}
var openQQCommand = {
    execute: function () {
        console.log('登录 QQ');
    }
};

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

var macroCommand = MacroCommand();
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

/*********最后给遥控器绑定“超级命令”**********/
macroCommand.execute()