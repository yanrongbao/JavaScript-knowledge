// 5.3.1 循环队列——击鼓传花游戏
class Deque {
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
function hotPotato(elementsList,num){
    const queue = new Deque();
    const elimitatedList = [];
    for(let i=0;i<elementsList.length;i++){
        queue.addBack(elementsList[i]); 
    }
    while(queue.size()>1){
        for (let i = 0; i < num; i++) { 
            queue.addBack(queue.removeFront()); // {3} 
        }
        elimitatedList.push(queue.removeFront()); // {4}    
    }
    return {
        eliminated: elimitatedList, 
        winner: queue.removeFront()
    }
}
const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']; 
const result = hotPotato(names, 7);
result.eliminated.forEach(name => { 
    console.log(`${name}在击鼓传花游戏中被淘汰。`); 
}); 
console.log(`胜利者： ${result.winner}`);

// 5.3.2 回文检查器
function palindromeChecker(aString){
    if(aString===undefined||aString===null||(aString!==null&&aString.length==0)){
        return false;
    }
    const deque = new Deque();
    const lowerString = aString.toLocaleLowerCase().split(' ').join('');
    let isEqual = true;
    let firstChar, lastChar;
    for(let i=0;i<lowerString.length;i++){
        deque.addBack(lowerString.charAt(i))
    }
    while(deque.size()>1&&isEqual){
        firstChar = deque.removeFront();
        lastChar = deque.removeBack();
        if(firstChar!==lastChar){
            isEqual=false;
        }
    }
    return isEqual;
}
console.log('a', palindromeChecker('a')); 
console.log('aa', palindromeChecker('aa')); 
console.log('kayak', palindromeChecker('kayak')); 
console.log('levee', palindromeChecker('levee')); 
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw')); 
console.log('Step on no pets', palindromeChecker('Step on no pets'));