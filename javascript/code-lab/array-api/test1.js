
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
    if(acc[cur.age]) {
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