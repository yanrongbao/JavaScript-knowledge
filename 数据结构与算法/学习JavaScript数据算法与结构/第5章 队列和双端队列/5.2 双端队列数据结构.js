// 5.2.1 创建 Deque 类
export default class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {}
    }
    // 向双端队列的前端添加元素
    addFront (element) {
        if (this.isEmpty()) {
            this.addBack(element)
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;
        }
    }
    addBack (element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 从队列前面移除元素
    removeFront () {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    // 从队列后面移除元素
    removeBack () {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count--;
        return result;
    }
    // 检查队列是否为空并获取它的长度
    isEmpty () {
        return this.count - this.lowestCount === 0;
    }
    size () {
        return this.count - this.lowestCount;
    }
    // 清空队列
    clear () {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    // 创建 toString 方法
    toString () {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }
        return objString;
    }
}
const deque = new Deque(); 
console.log(deque.isEmpty()); // 输出 true
deque.addBack('John'); 
deque.addBack('Jack');
console.log(deque.toString()); // John, Jack
deque.addBack('Camila'); 
console.log(deque.toString()); // John, Jack, Camila
console.log(deque.size()); // 输出 3 
console.log(deque.isEmpty()); // 输出 false
deque.removeFront(); // 移除 John 
console.log(deque.toString()); // Jack, Camila
deque.removeBack(); // Camila 决定离开
console.log(deque.toString()); // Jack
deque.addFront('John'); // John 回来询问一些信息
console.log(deque.toString()); // John, Jack
console.log(deque.size()); // 输出 2