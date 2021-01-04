var obj = {a: 1, b: 2, c: 3};

for (var prop in obj) {
  // console.info(prop);
  // if (prop === 'b') {
  //   break;
  // }
}

var arr = [4, 5, 6, 7, 8];

for (const iterator of arr) {
  // console.info(iterator);
  // if (iterator === 6) {
  //   break;
  // }
}

for (const key in arr) {
  // console.info(key);
}

for (const iterator of 'object') {
  // console.info(iterator);
}

let mySet = new Set();
mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add('some text'); // Set [ 1, 5, "some text" ]
let o = {a: 1, b: 2};
mySet.add(o);

for (const el of mySet) {
  console.info(el);
}

const map = new Map();

map.set(1, 'one');
map.set(2, 'two');
map.set(3, 'three');
map.set(4, 'four');

for (const el of map) {
  console.info(el)
}