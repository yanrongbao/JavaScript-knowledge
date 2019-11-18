class Stack {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    // 向栈中插入元素
    push (element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 验证一个栈是否为空和它的大小
    size () {
        return this.count;
    }
    isEmpty () {
        return this.count === 0;
    }
    // 从栈中弹出元素
    pop () {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 查看栈顶的值并将栈清空
    peek () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    clear () {
        this.items = {};
        this.count = 0;
        // while (!this.isEmpty()) { 
        //     this.pop(); 
        // }
    }
    // 创建 toString 方法
    toString () {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}
// 从十进制到二进制
// function decimalToBinary (decNumber) {
//     const remStack = new Stack();
//     let number = decNumber;
//     let rem;
//     let binaryString = '';
//     while (number > 0) {
//         rem = Math.floor(number % 2);
//         remStack.push(rem)
//         number = Math.floor(number / 2);
//     }
//     while (!remStack.isEmpty()) {
//         binaryString += remStack.pop()
//     }
//     return binaryString;
// }
// console.log(decimalToBinary(233)); // 11101001

// 进制转换算法
function baseConverter (decNumber, base) {
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
    let binaryString = '';
    if (!(base >= 2 && base <= 36)) {
        return '';
    }
    while (number > 0) {
        rem = Math.floor(number % base);
        remStack.push(rem)
        number = Math.floor(number / base);
    }
    while (!remStack.isEmpty()) {
        binaryString += digits[remStack.pop()];
    }
    return binaryString;
}
console.log(baseConverter(100345, 16)); // 187F9
console.log(baseConverter(100345, 35)); // 2BW0