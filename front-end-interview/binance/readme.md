# 币安 面试总结

 diy hooks 总结 https://usehooks-typescript.com/

## 一面

写一个compose函数，参数未知（arguments, promise) (https://segmentfault.com/a/1190000011447164)

写深拷贝 (https://juejin.cn/post/6844903929705136141)

解释一下闭包，以及闭包获取外层函数定义的变量的原理 (https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

react hook以及fiber

fiber的三大排序策略 (http://www.ptbird.cn/react-diff-from-code.html)(https://cloud.tencent.com/developer/article/1515760) (https://juejin.cn/post/6844904165026562056)

redux是用来做什么的，写一下redux处理数据的流程

有没有碰到过redux处理数据的一些性能问题

自己实现redux框架，说思路 (https://zhuanlan.zhihu.com/p/50247513)

发布订阅模式，单例模式，发布订阅模式，怎样监听事件，监听什么样的事件

实现权限管理（路由权限管理，页面权限管理，页面导航栏部分展示）

比如如果有个页面侧边导航栏需要向不同的人展示不同的选项，怎么实现？

1. hook （为什么没有生命周期/原理）

2. shadowEqual实现（我说了for in   面试官问为什么用循环  我没听懂想问什么）(https://www.imweb.io/topic/598973c2c72aa8db35d2e291)

3. react生命周期为什么有Unsafe_* （该组件有缺陷，容易造成溢出）(https://juejin.cn/post/6844903679418433550)

4. setState调用两次执行一次的原因（异步，后来想了想其实可能想问filber函数吧）->又问了复合函数和原生函数的区别 (https://cloud.tencent.com/developer/article/1431167)

5. dispatch的实现原理/redux流程（后来发现是想问源码的发布订阅都写在哪了：其实是想问createStore）

6. prototype继承  一个obj如果只想遍历自己的属性，怎么屏蔽掉继承的属性（没答上  应该是hasOwnProperty方法）

7. new Object  和 object.create的区别（没答上）(https://blog.csdn.net/blueblueskyhua/article/details/73135938)

8. ABtest  一个页面30%的人看到A  70%看到B  （我说了产生随机数，小于3显示A，大于3显示B，面试官让我实现一下  后来又说不用了，估计是挂了没啥写的必要了）

* Css盒子模型 (https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)
* Css Display inline, block (https://zhuanlan.zhihu.com/p/65353887)
* Hooks useEffect的理解 (https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)
* React setState后发生了什么 (https://zhuanlan.zhihu.com/p/65627731)
* CSR vs SSR 
* React同构有了解吗 (https://segmentfault.com/a/1190000020417285)
* Webpack 懒加载 (https://cloud.tencent.com/developer/section/1477238)
* eventLoop 宏任务 微任务一道题
* 手写给了一个object，value可能是array或者是number，按照深度优先遍历输出所有的number （包括数组里面的)  下面这个例子，输出 5,2,3,6,7
const foo = {
    a: 5,
b: [2,3],
c: {d: 6, e: 7}
}

* 增量式垃圾回收算法怎么实现的 (https://juejin.cn/post/6844903619720904717)
* 有向无环图 - 如何做拓扑排序 (https://www.cnblogs.com/en-heng/p/5085690.html)
* js执行栈的详细过程 (https://blog.fundebug.com/2019/03/20/understand-javascript-context-and-stack/)(https://heyingye.github.io/2018/03/19/js%E5%BC%95%E6%93%8E%E7%9A%84%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B%EF%BC%88%E4%B8%80%EF%BC%89/)
* 为什么箭头函数没有this (https://github.com/ruanyf/es6tutorial/issues/150)
* React callback和memo有什么区别 (https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)
* React Capture value原理 (https://github.com/brickspert/blog/issues/26)
* 浏览器关键渲染路径（CRP）(https://blog.csdn.net/NEWSEKAES/article/details/77662274) (https://blog.lbinin.com/frontEnd/base/Critical-Rendering-Path.html)
* 手写算法：dp的题目 给了一个数组，只能往右和下走，找出从左上角到右下角的最短路径 (https://leetcode-cn.com/problems/minimum-path-sum/)
* 除了前端, infrastructure 了解什么

## 二面

自己实现一个modal及 tooltip 组件，要求写，没写出来 (http://www.ptbird.cn/react-portal-createPortal.html) (https://segmentfault.com/a/1190000021755781)

怎样实现的文件上传 (https://segmentfault.com/a/1190000016824949)(https://blog.csdn.net/qq_43382853/article/details/104557408)(https://my.oschina.net/boychenney/blog/4347836)

文件上传时的拖拽功能怎么实现

文件上传的进度条怎样实现

文件上传怎样实现预览功能、需要监听哪些事件

之前做过的项目有什么亮点，或者比较有挑战性的事情

var maxDepth = function(root) {
    if(!root){return 0}
    else{
        let left=maxDepth(root.left);
        let right=maxDepth(root.right);
        return ((left>right)?left:right)+1
    }
};
