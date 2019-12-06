String.prototype.myIndexOf = function (str) {
    const sourceArr = this.split('');
    let num = -1;
    for (let i in sourceArr) {
        if (sourceArr[i] == str.slice(0, 1)) {
            if (str === this.slice(i, Number(i) + str.length)) {
                num = i
            }
        }
    }
    return num;
}
var a = 'abdddcdefghi'
var b = a.myIndexOf('eef')
console.log(b)