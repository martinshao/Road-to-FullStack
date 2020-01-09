const generatorFunction = function() {
  var i = 10;
  while (i) {
    console.info(i)
    i--;
  }
};

const iterator = generatorFunction();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

const generatorFunction = function* () {
  var i = 10;
  while (i) {
      yield i--;
  }
};

const iterator = generatorFunction();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());