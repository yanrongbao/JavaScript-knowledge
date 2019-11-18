var Folder = function (name) {
    this.name = name;
    this.parent = null;
    this.files = [];
}

Folder.prototype.add = function (file) {
    file.parent = this;
    this.files.push(file)
}
Folder.prototype.scan = function () {
    console.log('开始扫描文件夹:' + this.name)
    for (var i = 0, file, files = this.files; file = files[i++];) {
        file.scan();
    }
}
Folder.prototype.remove = function () {
    if (!this.parent) {
        return;
    }
    for (var files = this.parent.files, l = files.length; l >= 0; l--) {
        if (files[l] === this) {
            files.splice(l, 1)
        }
    }
}

var File = function (name) {
    this.name = name;
    this.parent = null;
}
File.prototype.add = function () {
    throw new Error('不能添加在文件下面');
}
File.prototype.scan = function () {
    console.log('开始扫描文件: ' + this.name);
}

File.prototype.remove = function () {
    if (!this.parent) {
        return;
    }
    for (var files = this.parent.files, l = files.length; l >= 0; l--) {
        if (files[l] == this) {
            files.splice(l, 1)
        }
    }
}

var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var file1 = new File('深入浅出 Node.js');

folder1.add(new File('JavaScript 设计模式与开发实践'));
folder.add(folder1);
folder.add(file1);

folder1.remove(); //移除文件夹
folder.scan();