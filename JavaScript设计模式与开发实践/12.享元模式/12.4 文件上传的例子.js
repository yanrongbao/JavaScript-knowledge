var Upload = function (uploadType) {
    this.uploadType = uploadType;
}
Upload.prototype.delFile = function (id) {
    uploadManager.setExternalState(id, this);
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom)
    }
    if (window.confirm('确定要删除该文件吗? ' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom)
    }
}

//12.4.4 工厂进行对象实例化
var uploadFactory = (function () {
    var createFlyWeightObjs = {};
    return {
        create: function (uploadType) {
            if (createFlyWeightObjs[uploadType]) {
                return createFlyWeightObjs[uploadType];
            }
            return createFlyWeightObjs[uploadType] = new Upload(uploadType);
        }
    }
})()

//12.4.5 管理器封装外部状态

var uploadManager = (function () {
    var uoloadDatabase = {}
    return {
        add: function (id, uploadType, fileName, fileSize) {
            var flyWeight = uploadFactory.create(uploadType);
            var dom = document.createElement('div');
            dom.innerHTML = '<span>文件名称:' + fileName + ', 文件大小: ' + fileSize + '</span>' +
                '<button class="delFile">删除</button>';
            dom.querySelector('.delFile').onclick = function () {
                flyWeight.delFile(id)
            }
            document.body.appendChild(dom);
            uoloadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            }
            return flyWeightObj;
        },
        setExternalState: function (id, flyWeightObj) {
            var uploadData = uploadDatabase(id);
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i]
            }
        }
    }
})()