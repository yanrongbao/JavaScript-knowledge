function countingSort (array) {
    if (array.length < 2) {
        return array;
    }
    const maxValue = findMaxValue(array);

    const counts = new Array(maxValue + 1);
    array.forEach(element => {
        if (!counts[element]) {
            counts[element] = 0
        }
        counts[element]++;
    })
    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while (count > 0) {
            array[sortedIndex++] = i;
            count--;
        }
    })
    return array;
}

function findMaxValue (array) {
    let maxValue = array[0];
    for (let index = 0; index < array.length; index++) {
        if (array[index] > maxValue) {
            maxValue = array[index]
        }
        return maxValue;
    }
}
let arr = [5, 8, 9, 1, 3, 5, 4, 3];
console.log(countingSort(arr))