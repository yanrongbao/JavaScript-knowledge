// 双重循环
// 双重循环去重实现比较容易
Array.prototype.unique=function(){
    const newArray=[];
    let isRepeat= false;
    for(let i=0;i<newArray.length;i++){
        isRepeat =false;
        for(let j = i+1; j < newArray.length; j++){
            if (this[i] === newArray[j]) {
                isRepeat = true;
                break;
              }
        }
        if (!isRepeat) {
            newArray.push(this[i]);
        }
    }
    return newArray;
}

// Array.prototype.indexOf()
Array.prototype.unique=function(){
    return this.filter((item,index)=>{
        return this.indexOf(item)===index;
    })
}
Array.prototype.unique = function () {
  const newArray = [];
  this.forEach(item => {
    if (newArray.indexOf(item) === -1) {
      newArray.push(item);
    }
  });
  return newArray;
}
Array.prototype.unique = function () {
    const newArray = [];
    this.sort();
    for (let index = 0; index < this.length; index++) {
        if(this[i]!==newArray[newArray.length-1]){
            newArray.push(newArray[i])
        }
    }
    return newArray;
}

// Array.prototype.reduce()
Array.prototype.unique=function(){
    return this.sort().reduce((init,current)=>{
        if(init.length===0||init[init.length-1]!==current){
            init.push(current);
        }
        return init;
    },[])
}

// Set
Array.prototype.unique = function () {
    const set = new Set(this);
    return Array.from(set);
}