# JavaScript面试题

## 基础部分，考察一些基本API用法和基本语言特性
1. null、undefined和未声明变量之间有什么区别？如何检查判断这些状态值？
2. 请说明.forEach循环和.map()循环的主要区别，它们分别在什么情况下使用？
3. JavaScript中的map和filter、reduce使用方法介绍和日常使用场景。
4. .call和.apply有什么区别？
5. 请说明Function.prototype.bind的用法。
6. 请描述事件冒泡。
7. ==和===的区别是什么？
8. 请解释关于 JavaScript 的同源策略。
9. 你使用什么语句遍历对象的属性和数组的元素？
10. 使用let、var和const创建变量有什么区别？


## 进阶部分，考察一些基本原理知识和复杂API使用

1. 请解释事件委托（event delegation）。
2. 什么是闭包（closure），为什么使用闭包？
3. 请简述JavaScript中的this。
4. 请解释原型继承（prototypal inheritance）的工作原理。
5. 说说你对 AMD 和 CommonJS 的了解。
6. 匿名函数的典型应用场景是什么？
7. IIFE是什么？和使用场景是什么？
8. 你如何组织自己的代码？（使用模块模式（module pattern）还是经典继承（classical inheritance）？）
9. 宿主对象（host objects）和原生对象（native objects）的区别是什么？
10. 下列语句有什么区别：function Person(){}、var person = Person()和var person = new Person()？
11. 请解释变量提升（hoisting）。
12. 请解释可变对象和不可变对象之间的区别。
13. 请解释同步和异步函数之间的区别。
14. 什么是事件循环？调用堆栈和任务队列之间有什么区别？

## 高级部分，JavaScript运行原理和语言特性的深入了解


## 京城一灯面试题

1. 浏览器为什么要阻止跨域请求？如何解决跨越？每次跨越请求都需要到达服务端吗？浏览器端怎么拦截跨越请求的发出(是发出，不是接收)?
2. 实现一个函数 findLastIndex(), 返回指定数在“有序”数组中最后一次出现位置的索引 如findLastIndex([1,2,3,3,3,4,5], 3), 返回4。时间复杂度是多少？什么情况下时间复杂度最高？
3. WebWorker的缺点是什么？在worker线程怎么获取主线程上下文？解决卡顿的问题除了使用WebWorker还有其他的解决方案吗？（面试中，建议了解下fiber）
有没有测试过worker通信时间？
4. 完善下面函数，实现图片的加载
function createImg(url){   }
createImg(url).then((value) => {
    document.body.appendChild(value)
})
5. JavaScript 中函数继承主要继承的是什么？可以继承函数体吗？为什么？

## 从浏览器设计角度谈性能优化

* [现代浏览器工作原理](http://chuquan.me/2018/01/21/browser-architecture-overview/)
* [十分钟读懂浏览器渲染流程](https://blog.csdn.net/chanzhi2016/article/details/79345565)
* [浏览器渲染原理、渲染阻塞、帧原理一次性说完](https://www.xuanbiyijue.com/2020/07/25/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E5%8E%9F%E7%90%86%E3%80%81%E6%B8%B2%E6%9F%93%E9%98%BB%E5%A1%9E%E3%80%81%E5%B8%A7%E5%8E%9F%E7%90%86%E4%B8%80%E6%AC%A1%E6%80%A7%E8%AF%B4%E5%AE%8C/)
* [浏览器的渲染：过程与原理](https://juejin.im/entry/6844903503609987080)
* [渲染页面：浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)
* 