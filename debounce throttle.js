// 1.防抖
// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

function debounce(fn) {
    let timeout = null;//创建一个定时器返回值
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this.arguments);
        }, 500)
    }

}
// 2.节流
// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

// 思路：
// 每次触发事件时都判断当前是否有等待执行的延时函数

function throttle(fn) {
    let canRun = true;//通过闭包保存一个标记
    return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => {
            fn.apply(this.arguments);
            canRun = true;
        }, 500)
    }
}