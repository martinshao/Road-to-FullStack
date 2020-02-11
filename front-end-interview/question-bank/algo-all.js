const bsearch = (array, x) => {
    let l = 0
    let r = array.length - 1
    let guess
    while (l <= r) {
        console.info('find')
        guess = Math.floor((l + r) / 2)
        if (array[guess] === x) return guess
        if (array[guess] > x) l = guess + 1
        else r = guess - 1
    }
    return -1
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8]
console.log(bsearch(arr, 6))