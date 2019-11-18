// 递归
function flatten(arr){
    var result = [];
    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            result= result.concat(flatten(arr[i]))
        }else{
            result.push(arr[i])
        }
    }
    return result;
}

// reduce
function flatten(arr){
    return arr.reduce((prev,next)=>{
        return prev.concat(Array.isArray(next)?flatten(next):next)
    },[])
}

// reduce
function flatten(arr){
    return arr.flat(Infinity)
}