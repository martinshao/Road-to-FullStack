console.info(1)

setTimeout(() => {
  console.info(7)
});

const p1 = new Promise(resolve => {
  console.info(2)
  resolve(3)
})

console.info(4)

setTimeout(() => {
  console.info(5)
});

p1.then(res => console.info(res))

console.info(6)


function* gen() {
  console.info(1)
  yield 'hello';
  console.info(2)
  yield 'world';
  console.info(3)
  console.info(4)
  return true;
}

var iter = gen();
var a = iter.next(); // 1
console.log(a); // {value:'hello', done:false}
var b = iter.next(); // 2
console.log(b); // {value:'world', done:false}
var c = iter.next(); // 3 4
console.log(c); // {value:true, done:true}


function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }

function run(gen) {
  var g = gen();

  function next(data) {
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data);
    });
  }

  next();
}

function* foo() {
  let response1 = yield fetch('https://xxx') //返回promise对象
  console.log('response1')
  console.log(response1)
  let response2 = yield fetch('https://xxx') //返回promise对象
  console.log('response2')
  console.log(response2)
}
run(foo);

const foo = async () => {
  let response1 = await fetch('https://xxx')
  console.log('response1')
  console.log(response1)
  let response2 = await fetch('https://xxx')
  console.log('response2')
  console.log(response2)
}