//500元订单
var order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500 元定金预购, 得到 100 优惠券');
    } else {
        order200(orderType, pay, stock); // 将请求传递给 200 元订单
    }
}

// 200 元订单
var order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200 元定金预购, 得到 50 优惠券');
    } else {
        orderNormal(orderType, pay, stock); // 将请求传递给普通订单
    }
};

// 普通购买订单
var orderNormal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买, 无优惠券');
    } else {
        console.log('手机库存不足');
    }
};