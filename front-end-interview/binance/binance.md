# 币安 面试总结

## 一面

* 自我介绍和项目经验
* redux是用来做什么的，写一下redux处理数据的流程
* 常用的hooks的介绍，callback和memo有什么区别
* eventLoop 宏任务 微任务一道题
* 编程题：发布订阅模式，单例模式，发布订阅模式，怎样监听事件，监听什么样的事件
* 编程题：shadowEqual实现
* 编程题：手写给了一个object，value可能是array或者是number，按照深度优先遍历输出所有的number （包括数组里面的)  下面这个例子，输出 5,2,3,6,7
const foo = {
    a: 5,
b: [2,3],
c: {d: 6, e: 7}
}

## 二面

* 列表的key的作用是什么？一般用什么作为key？有什么区别？长列表渲染有什么优化办法？
* 接着上面的问题，问了dom diff策略已经扩展问题
* React项目中优化性能方面做过什么工作？
* CSR vs SSR的区别，React同构有了解吗？
* 编程题：实现了compose 函数
* 编程题：自定义hooks，实现useInterval，

