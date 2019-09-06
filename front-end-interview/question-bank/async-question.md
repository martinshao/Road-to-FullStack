# JavaScript异步问题面试题总结

* [这一次，彻底弄懂 Promise 原理](https://juejin.im/post/5d6f7c83e51d4561c541a712)
* [[ES6] async/await 应用指南](https://juejin.im/post/5b4220f46fb9a04f8a216b31)
* [更快的异步函数和 Promise](https://v8.js.cn/blog/fast-async/)
* [如何正确使用 async/await？](https://www.infoq.cn/article/javascript-async-await-the-good-part-pitfalls-and-how-to-use)
* [深入理解async / await](https://juejin.im/post/5b99cbe35188255c930dc74c)
* [Node 定时器详解](http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html)
* [进程与线程、同步与异步、阻塞与非阻塞、并发与并行](https://juejin.im/post/5ce505b4e51d45775e33f4cd)
* [Node.js中的事件循环，定时器和process.nextTick()](https://juejin.im/post/5bd72beb5188257e4a681cf6)
* [JS(浏览器)事件环 (宏、微任务)](https://juejin.im/post/5d552275e51d456201486e24)
* [IO - 同步，异步，阻塞，非阻塞 （亡羊补牢篇）](https://blog.csdn.net/historyasamirror/article/details/5778378)
* [深入理解并发 / 并行，阻塞 / 非阻塞，同步 / 异步](https://juejin.im/entry/58ae4636b123db0052b1caf8)
* [同步，异步，阻塞，非阻塞等关系轻松理解](https://github.com/calidion/calidion.github.io/issues/40)
* [进程和线程](https://www.liaoxuefeng.com/wiki/1016959663602400/1017627212385376)
* [腾讯面试题04.进程和线程的区别？](https://blog.csdn.net/mxsgoden/article/details/8821936)
* [进程和线程的区别](https://www.cnblogs.com/lmule/archive/2010/08/18/1802774.html)
* [线程与进程的区别](https://www.jianshu.com/p/10e71fcbc5b8)

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
