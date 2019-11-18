class stack{
    constructor(){
        this.items= []
    }
    // 向栈添加元素
    push(element){
        this.items.push(element)
    }
    // 从栈移除元素
    pop(){
        return  this.items.pop();
    }
    // 查看栈顶元素
    peek(){
        return this.items[this.items.length-1];
    }
    // 检查栈是否为空
    isEmpty(){
        return this.items.length === 0;
    }
    // 清空栈元素
    clear(){
        this.items=[]
    }
}