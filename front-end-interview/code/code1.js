

const fn1 = (a, b, c, d) => a - b * c + d;
const fn2 = bindLeft(fn1, 1, 2);
console.log(fn2(3, 4));

