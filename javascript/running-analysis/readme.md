# JavaScript执行机制深度解析系列文章

有感于JavaScript在日常开发中越来越重要，对于底层运行机制的了解也逐渐成为前端工程师的软实力，故有此系列文章。

从JavaScript是单线程编程语言入手，分析执行栈和event loop，然后是分析堆栈中发生的事情。堆中用于存储引用变量，栈中存储执行上下文和基础变量。



## 写这个系列文章的总纲：
1. 了解JavaScript的内存管理，这是运行机制解析的铺垫工作
2. 在了解JavaScript的内存管理中，认识（Stack）和（Heap）
3. 分析Stack、Heap与Call Stack之间的关系和联系
4. 正式进入JavaScript执行机制的分析，主要是调用栈、异步队列和事件循环等概念解析。
5. JavaScript执行上下文分析基础文：分析VO、AO、GO和词法环境、变量环境的区别
6. JavaScriptES3中VO、AO、GO详解执行过程
7. JavaScript与ES5中词法环境详解过程
8. 实战，执行上下文的实例应用举例：闭包

## 文章目录：
1. JavaScript执行机制深度解析——内存管理
2. JavaScript执行机制深度解析——垃圾回收与四种常见内存泄露
2. JavaScript执行机制深度解析——Stack三个概念和Heap的解析
3. JavaScript执行机制深度解析——调用栈、异步队列和事件循环
8. JavaScript执行机制深度解析——什么是栈帧？
4. JavaScript执行机制深度解析——浏览器和NodeJs中Event Loop区别
4. JavaScript执行机制深度解析——NodeJs中Event Loop实例分析
4. JavaScript执行机制深度解析——执行上下文与调用栈
4. JavaScript执行机制深度解析——执行上下文ES3规范和ES5规范
4. JavaScript执行机制深度解析——EC和Scope、VO、AO（ES3规范）
5. JavaScript执行机制深度解析——ES5规范和词法环境
7. JavaScript执行机制深度解析——变量对象解释闭包

内存管理 (会包含后面几个概念): 栈内存，堆内存，内存分配，内存回收

## 关键词

由于该文章会有大量的专业名词和简称，故有如下名词索引：

* `EC`：函数执行环境（或执行上下文），Execution Context
* `GEC`：全局执行环境（或全局执行上下文），Global Execution Context
* `ECS`：执行环境栈，Execution Context Stack
* `VO`：变量对象，Variable Object
* `AO`：活动对象，Active Object
* `GO`：全局对象，Global Object
* `scope chain`：作用域链
* `Lexical Environment`：词法环境
* `Variable Environment`：变量环境
* `Environment Record`：环境记录
* `outer Lexical Environment`：外部词法环境
* `Object Environment Record`：对象环境记录
* `Declarative Environment Record`：声明性环境记录
* `Function Environment Record`：函数环境记录
* `Global Environment Records`：全局环境记录
* `Module Environment Record`：模块环境记录