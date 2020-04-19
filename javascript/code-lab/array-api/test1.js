
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 'Hello World'
}

const arr1 = []
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    const el = obj[key];
    arr1.push(el)
  }
}

const arr2 = Object.keys(obj).map(
  item => obj[item]
)

const arr3 = Object.entries(obj).reduce(
  (accumulator, currentValue) => [...accumulator, currentValue[1]],
  []
)

const arr5 = Object.entries(obj).reduce(
  (accumulator, currentValue) => accumulator.concat(currentValue[1]),
  []
)

const dataSource = [1, 2, 3, 4, 5]
const filted = dataSource.filter(item => item > 2)

[0, 1, 2, 3, 4].reduce((prev, curr) => prev + curr);
[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => { return accumulator + currentValue; }, 10);

const twoDArray = [[0, 1], [2, 3], [4, 5]]

const arr = twoDArray.reduce(
  (acc, cur) => acc.concat(cur),
  []
)

const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
const nameTimes = names.reduce(
  (acc, cur) => {
    if (acc.hasOwnProperty(cur)) {
      return {
        ...acc,
        [cur]: acc[cur] + 1
      }
    } else {
      return {
        ...acc,
        [cur]: 1
      }
    }
  }, {}
)

var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});

var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

const classed = people.reduce(
  (acc, cur) => {
    if (acc[cur.age]) {
      acc[cur.age].push(cur)
    } else {
      acc[cur.age] = []
      acc[cur.age].push(cur)
    }
    return acc
  }, {}
)

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, 'age');

// friends - 对象数组
// where object field "books" - list of favorite books 
const friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];

// allbooks - list which will contain all friends' books +  
// additional list contained in initialValue

const allBooks = friends.reduce(
  (acc, cur) => [...acc, ...cur.books],
  []
)

var allbooks = friends.reduce(function (prev, curr) {
  return [...prev, ...curr.books];
}, ['Alphabet']);

// 数组去重

const myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];

const arr = [...new Set(myArray)]
const orderedArray = Array.from(new Set(myArray))

const myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue);
  }
  return accumulator
}, [])

let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
let result = arr.sort().reduce((init, current) => {
  if (init.length === 0 || init[init.length - 1] !== current) {
    init.push(current);
  }
  return init;
}, []);

// 按顺序运行Promise
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
 return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10)
  .then(console.log);   // 1200


// Building-blocks to use for composition
const double = x => x + x;
const triple = x => 3 * x;
const quadruple = x => 4 * x;

// Function composition enabling pipe functionality
const pipe = (...functions) => input => functions.reduce(
  (acc, fn) => fn(acc),
  input
);

const pipe = (...functions) => {
  return (input) => {
    return functions.reduce(
      (acc, fn) => fn(acc), input
    )
  }
}

const pipe = (...functions) => {
  console.info(functions)
}

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);