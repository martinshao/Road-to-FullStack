# JavaScript异步问题面试题总结

* [这一次，彻底弄懂 Promise 原理](https://juejin.im/post/5d6f7c83e51d4561c541a712)
* [[ES6] async/await 应用指南](https://juejin.im/post/5b4220f46fb9a04f8a216b31)
* [更快的异步函数和 Promise](https://v8.js.cn/blog/fast-async/)
* [JavaScript loops - how to handle async/await](https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/)
* [深入理解 async / await](https://juejin.im/post/5b99cbe35188255c930dc74c)

## setTimeout、Promise、Async/Await 的区别

## Async/Await 如何通过同步的方式实现异步

## Promise 构造函数是同步执行还是异步执行，那么 then 方法呢

## 请写出下面代码的运行结果

``` js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}

console.log('script start');
setTimeout(function () {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');
```

解答：

script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout

## 输出以下代码执行结果，大致时间就好（不同于上题）

``` js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  await wait();
  await wait();
  await wait();
  console.timeEnd();
}
main();
```

## 输出以下代码执行结果

``` js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main1() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main1();
```
