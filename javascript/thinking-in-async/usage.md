# Promise从入门到精通

## 抽象

抽象 是计算机发展中，一个至关重要的思想。

属于理性认识阶段。抽象思维凭借科学的抽象概念对事物的本质和客观世界发展的深远过程进行反映，使人们通过认识活动获得远远超出靠感觉器官直接感知的知识。科学的抽象是在概念中反映自然界或社会物质过程的内在本质的思想，它是在对事物的本质属性进行分析、综合、比较的基础上，抽取出事物的本质属性，撇开其非本质属性，使认识从感性的具体进入抽象的规定，形成概念。空洞的、臆造的、不可捉摸的抽象是不科学的抽象。科学的、合乎逻辑的抽象思维是在社会实践的基础上形成的。

抽象思维作为一种重要的思维类型，具有概括性、间接性、超然性的特点，是在分析事物时抽取事物最本质的特性而形成概念，并运用概念进行推理、判断的思维活动。

抽象思维深刻地反映着外部世界，使人能在认识客观规律的基础上科学地预见事物和现象的发展趋势，预言“生动的直观”没有直接提供出来的、但存在于意识之外的自然现象及其特征。它对科学研究具有重要意义。

## 状态 与 动作

将这个世界的运行规律抽象成 状态 与 动作 。生与死是一种状态，美与丑是一种状态，快乐和悲伤也是一种状态，那么动作就是改变状态的存在。生老病死，这是人世间存在的客观规律，也可以说是改变生命由生到死，由健康到疾病的一种动作。

## 状态机

有限状态机，（英语：Finite-state machine, FSM），又称有限状态自动机，简称状态机，是表示有限个状态以及在这些状态之间的转移和动作等行为的数学模型。

有限状态机是一种用来进行对象行为建模的工具，其作用主要是描述对象在它的生命周期内所经历的状态序列，以及如何响应来自外界的各种事件。在计算机科学中，有限状态机被广泛用于建模应用行为、硬件电路系统设计、软件工程，编译器、网络协议、和计算与语言的研究。


## 基本介绍

Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象

一个 Promise有以下几种状态:

* pending: 初始状态，既不是成功，也不是失败状态。
* fulfilled: 意味着操作成功完成。
* rejected: 意味着操作失败。

pending 状态的 Promise 对象可能会变为fulfilled 状态并传递一个值给相应的状态处理方法，也可能变为失败状态（rejected）并传递失败信息。

当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法（handlers ）就会被调用（then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当Promise状态为fulfilled时，调用 then 的 onfulfilled 方法，当Promise状态为rejected时，调用 then 的 onrejected 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争）。

* `Promise.all()`
* `Promise.prototype.allSettled()`
* `Promise.prototype.catch()`
* `Promise.prototype.finally()`
* `Promise.prototype.then()`
* `Promise.race()`
* `Promise.reject()`
* `Promise.resolve()`

基本语法

``` js
new Promise(
    /* executor */
    function(resolve, reject) {...}
);

promise
    .then(value => { /* ... */})
    .catch(error => { /* ... */});
```

executor是带有 resolve 和 reject 两个参数的函数 。Promise构造函数执行时立即调用executor 函数， resolve 和 reject 两个函数作为参数传递给executor（executor 函数在Promise构造函数返回所建promise实例对象前被调用）。resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）。executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用resolve函数来将promise状态改成fulfilled，要么调用reject 函数将promise的状态改为rejected。如果在executor函数中抛出一个错误，那么该promise 状态为rejected。executor函数的返回值被忽略。

![base is important as Sun](https://mdn.mozillademos.org/files/8633/promises.png "galaxy.jpg")

## 参考资料

* [MDN Promise][1]
* [MDN 使用 Promise][2]

[1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
[2]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises
