const input = [1, 4, 3, 8, 9];

let sum = (total, current) => total + current;
let total = arr => arr.reduce(sum);
let size = arr => arr.length;
let divide = (a, b) => a / b;
let average = arr => divide(total(arr), size(arr));
average(input);