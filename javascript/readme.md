# JavaScript基础与精粹

编程知识浩如繁星，即使站在人间最高峰，也依旧能感受到自身的渺小。
![base is important as Sun](./_assets/galaxy-stars.jpg "galaxy.jpg")

不得不感慨一下，随着前端近几年的飞速发展，各种前端框架百花齐放，从业人员应接不暇的同时，也感到迷茫和困惑：怎么能够从技术包围中找到突破点，我认为应当从基础开始，前端的基础在于html、css、JavaScript，这其中我认为JavaScript是核心要领，学好JavaScript原生，就是学好了九阳神功，再接触其他框架时，便能事半功倍。

学习JavaScript原生，从基础到精髓，从ES5到ES6，甚至ES7、ES8、ES9，不断完善JavaScript语言基础。

该系列文章希望偏实用注意讲解日常开发中，JavaScript遇到的一些问题和知识体系的归纳总结。

## collapsible markdown?

<details>
<summary>CLICK ME</summary>

**<summary>标签与正文间一定要空一行！！！**
</details>

## JavaScript基础中基础

### 基础系列文章思路

1. 对于变量的探讨
2. 对于模块化发展历程的探讨
3. 对于原型链和作用域链的探讨
4. 对于关键API的探讨
5. 对于JavaScript继承的探讨

### 基础系列文章目录

* [JavaScript基础之变量类型][101]
* [JavaScript内存管理与垃圾回收][102]
* JavaScript四种常见内存泄漏 - 3
* [JavaScript探究this奥秘之旅][105]
* JavaScript基础当我谈论变量时 - 6
* JavaScript的模块化发展与现状 - 7
* JavaScript面向对象编程范式简介 - 8
* [JavaScript原型链深度剖析和应用][109]
* JavaScript深入之从作用域链理解闭包 - 10
* JavaScript深入之闭包面试题解 - 11
* 深入浅出图解作用域链和闭包 - 12
* 深度解析 `new` 原理及模拟实现 - 13
* JavaScript继承方式详解 - 14
* [JavaScript 中函数的方方面面][116]

[101]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/articles/js-variable-type.md
[102]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/running-analysis/mm-gc.md
[105]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/articles/about-this.md
[109]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/articles/prototype-chain.md
[116]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/articles/about-function.md

----------------------------------------------------------------------------

## JavaScript运行机制深入

### 系列文章的思路

1. 了解JavaScript的内存管理，这是运行机制解析的铺垫工作
2. 在了解JavaScript的内存管理中，认识（Stack）和（Heap）
3. 分析Stack、Heap与Call Stack之间的关系和联系
4. 正式进入JavaScript执行机制的分析，主要是调用栈、异步队列和事件循环等概念解析。
5. JavaScript执行上下文分析基础文：分析VO、AO、GO和词法环境、变量环境的区别
6. JavaScriptES3中VO、AO、GO详解执行过程
7. JavaScript与ES5中词法环境详解过程
8. 实战，执行上下文的实例应用举例：闭包

### 系列文章目录

* [JavaScript执行机制深度解析——调用栈和执行上下文][21]
* [JavaScript执行机制深度解析——执行上下文ES3规范和ES5规范][22]
* [JavaScript执行机制深度解析——ES3规范和Scope、VO、AO][23]
* [JavaScript执行机制深度解析——ES5规范和词法环境][24]
* [JavaScript执行机制深度解析——变量对象解释闭包][25]
* [JavaScript执行机制深度解析——理解函数执行过程][26]

* JavaScript执行机制深度解析——调用栈、异步队列和事件循环
* JavaScript执行机制深度解析——浏览器和NodeJs中Event Loop区别
* JavaScript执行机制深度解析——NodeJs中Event Loop实例分析

### 补充目录

* JavaScript执行机制深度解析——内存管理
* [JavaScript执行机制深度解析——什么是栈帧？][28]
* JavaScript执行机制深度解析——垃圾回收与四种常见内存泄露
  * [一文搞懂V8引擎的垃圾回收](https://juejin.cn/post/6844904016325902344)
* JavaScript执行机制深度解析——Stack三个概念和Heap的解析

----------------------------------------------------------------------------

## ES6新特性学习与实践

* ES6编程风格与精粹
* ES6之Promise原理与实践
* ES5实践ES6-promise A+规范
* ES6的Async/Await原理
* ES6深入之重新认识箭头函数的this
* ES6异步编程大总结

----------------------------------------------------------------------------

## JavaScript编程小技巧

* 如何善用函数式编程
* 防抖/节流原理
* JavaScript的AOP编程
* JavaScript中立即执行函数详解
* JavaScript中call 和 apply原理与实践
* JavaScript中bind原理与实践
* JavaScript解析赋值、浅拷贝和深拷贝的区别
* JavaScript中的Mixin技巧

[21]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/running-analysis/callstack-context.md
[22]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/running-analysis/context-es3-es5.md
[23]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/running-analysis/es3-vo-ao.md
[24]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/running-analysis/es5-le-ve.md
[28]: https://github.com/Martin-Shao/Road-to-FullStack/blob/master/javascript/articles/2019-4-21-1.md
