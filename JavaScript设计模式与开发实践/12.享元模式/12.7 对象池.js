var toolTipFactory = (function () {
    var toolTipPool = [];
    return {
        create: function () {
            if (toolTipPool.length === 0) {
                var div = document.createElement('div');
                document.body.appendChild(div);
                return div;
            } else {
                return toolTipPool.unshift();
            }
        },
        recover: function (toolTopDom) {
            return toolTipPool.push(toolTopDom)
        }
    }
})();

var ary = [];
for (var i = 0, str; str = ['A', 'B'][i++];) {
    var toolTip = toolTipFactory.create()
    toolTip.innerHTML = str;
    arr.push(toolTip)
}

for (var i = 0, toolTip; toolTip = ary[i++];) {
    toolTipFactory.recover(toolTip)
}
for (var i = 0, str; str = ['A', 'B', 'C', 'D', 'E', 'F'][i++];) {
    var toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
};