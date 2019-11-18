// 5.1.1 创建队列
class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    // 向队列添加元素
    enqueue (element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 从队列移除元素
    dequeue () {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    // 查看队列头元素
    peek () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount]
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

// 5.1.2 使用 Queue 类
const queue = new Queue(); 
console.log(queue.isEmpty()); // 输出 true
queue.enqueue('John'); 
queue.enqueue('Jack'); 
console.log(queue.toString()); // John,Jack

queue.enqueue('Camila');
console.log(queue.toString()); // John, Jack, Camila 
console.log(queue.size()); // 输出 3 
console.log(queue.isEmpty()); // 输出 false

queue.dequeue(); // 移除 John 
queue.dequeue(); // 移除 Jack 
console.log(queue.toString()); // Camila