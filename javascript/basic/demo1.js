// 关于对象

let car ={
  color: 'red',
  price: 12000
}

let carKey = Object.keys(car);

console.info(carKey);

let BMW = new Map();

BMW.set(1, 'shaogucheng');
BMW.set(2, 'nan');
BMW.set(3, 23);

let iterator1 = BMW.keys();

console.info(iterator1[1])

iterator1.next().value

var a = 'foo', b = 42, c = {};
var o = {a, b, c};
var o = {a: a, b: b, c: c};

function test (...theArgs) {
  console.info(Array.isArray(theArgs))
  console.info(Array.isArray(...theArgs))
  console.info(...theArgs)
  console.info(theArgs)
}

test(1,2,3,4)
// true
// false
// 1 2 3 4
// [1, 2, 3, 4]