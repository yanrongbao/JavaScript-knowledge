window.onload = function () {
    waterFall('main', 'box');
    var dataInt = { "data": [{ "src": '1.jpg' }, { "src": '2.jpg' }, { "src": '3.jpg' }, { "src": '4.jpg' }]}
    window.onscroll = function () {
        if(checkScrollSlide()){
            var oParent = document.getElementById('main');
            //将数据块渲染到页面尾部
            for(var i=0;i<dataInt.data.length;i++){
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = 'images/' + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterFall('main', 'box');
        }
    }
}
function waterFall(parent, sclass) {
    //将main下所有class为box的元素
    var oParent = document.getElementById(parent);
    //将取到的元素赋值给数组
    var oBoxs = getByClass(oParent, sclass)
    //计算整个页面显示的列数(页面宽/box的宽)
    var oBoxsW = oBoxs[0].offsetWidth;  //获取元素的宽
    //计算每一行的列数
    var clos = Math.floor((document.documentElement.scrollWidth > document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth / oBoxsW); 

    oParent.style.cssText = 'width:' + oBoxsW * clos + 'px;margin:0 auto';    //设置main的宽然后居中

    var hArr = [];  //存放每一列数组的高度
    for (var i = 0; i < oBoxs.length; i++) {    //循环加入数组高度
        if(i < clos){   //数组中加入第一列的高度
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH = Math.min.apply(null, hArr);  //去数组中的最小值
            var mIndex = getMinhIndex(hArr, minH);   //取最小值的索引
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            //oBoxs[i].style.left = oBoxsW * mIndex + 'px';
            oBoxs[i].style.left = oBoxs[mIndex].offsetLeft + 'px';
            hArr[mIndex] += oBoxs[i].offsetHeight;
        }
    }
    console.log(minH);
}
//根据与class获取元素
function getByClass(parents, className) {
    var boxArr = [],    //用了存储所有class为box的元素  
    oEles = parents.getElementsByTagName('*');
    for (var i = 0, oElesL = oEles.length; i < oElesL; i++){
        if (oEles[i].className.indexOf(className) != -1){
            boxArr.push(oEles[i]);
        }
    }
    return boxArr;
}
//获取元素offsetTop最低的索引
function getMinhIndex(arr, val) {
    for(var i in arr){
        if(arr[i] == val){
            return i;
        }
    }
}
//检查是否具备了滚动加载数据块的条件
function checkScrollSlide() {
    var  oParent = document.getElementById('main');     //获取父元素
    var oBoxs = getByClass(oParent, 'box');             //去除所有box
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);               //求出最后一个box 的高度加上她的自身高的一半
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;      //获取滚动条滚走的距离
    var height = document.body.clientHeight || document.documentElement.clientHeight;   //获取浏览器窗口可视区域的高
    return (lastBoxH < scrollTop + height)? true:false;
}