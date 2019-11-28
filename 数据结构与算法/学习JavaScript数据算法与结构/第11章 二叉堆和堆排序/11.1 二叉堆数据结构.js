const { defaultCompare, Compare } = require('./utils')

class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }
    insert (value) {
        if (value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }
    siftUp (index) {
        let parent = this.getParentIndex(index);
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }
    size () {
        return this.heap.length;
    }
    isEmpty () {
        return this.size() === 0;
    }
    findMinimum () {
        return this.isEmpty() ? undefined : this.heap[0];
    }
    // 导出堆中的最小值或最大值
    extract () {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap.shift();
        this.heap.unshift(this.heap.pop())
        this.siftDown(0);
        return removedValue;
    }
    // 下移操作（堆化）
    siftDown (index) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        if (
            left < size &&
            this.compareFn(this.heap[element], this.heap[left]) ===
            Compare.BIGGER_THAN
        ) {
            element = left;
        }
        if (
            right < size &&
            this.compareFn(this.heap[element], this.heap[right]) ===
            Compare.BIGGER_THAN
        ) {
            element = right;
        }
        console.log(index, element)
        if (index !== element) {
            swap(this.heap, index, element);
            this.siftDown(element);
        }
    }
    getLeftIndex (index) {
        return 2 * index + 1;
    }
    getRightIndex (index) {
        return 2 * index + 2;
    }
    getParentIndex (index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }
}
function swap (array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}
const heap = new MinHeap();
for (let i = 1; i < 10; i++) {
    heap.insert(i);
}
// console.log('Extract minimum: ', heap.extract()); // 1
// console.log('Extract minimum: ', heap.heap); // 1

class MaxHeap extends MinHeap {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = reverseCompare(compareFn); // {1} 
    }
}
function reverseCompare (compareFn) {
    return (a, b) => compareFn(b, a);
}
const maxHeap = new MaxHeap();
maxHeap.insert(2);
maxHeap.insert(3);
maxHeap.insert(4);
maxHeap.insert(5);
maxHeap.insert(1);
console.log('Heap size: ', maxHeap.size()); // 5 
console.log('Heap min value: ', maxHeap.findMinimum()); // 5
console.log(maxHeap.heap)