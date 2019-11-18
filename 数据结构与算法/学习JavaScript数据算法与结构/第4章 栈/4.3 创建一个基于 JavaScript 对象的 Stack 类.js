class Stack { 
    constructor() { 
        this.count = 0; 
        this.items = {}; 
    } 
    // 向栈中插入元素
    push(element){
        this.items[this.count]= element;
        this.count++;
    }
    // 验证一个栈是否为空和它的大小
    size(){
        return this.count;
    }
    isEmpty(){
        return this.count === 0;
    }
    // 从栈中弹出元素
    pop(){
        if(this.isEmpty){
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 查看栈顶的值并将栈清空
    peek(){
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.count-1];
    }
    clear() { 
        this.items = {}; 
        this.count = 0; 
        // while (!this.isEmpty()) { 
        //     this.pop(); 
        // }
    }
    // 创建 toString 方法
    toString(){
        if(this.isEmpty()){
            return '';
        }
        let objString = `${this.items[0]}`;
        for(let i=1;i<this.count;i++){
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}