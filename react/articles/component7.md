# React组件性能优化——PureComponent

![](../assets/20191007211702.png)

我们对于React性能优化的起点大抵上还是来源上图，我们常说React有这样几个特性，视图层框架、基于状态属性管理视图、单向数据流等。React如何对视图进行管理，答案是状态，管理好状态及其变化就管理好了视图。

那这些跟我们今天谈到的性能优化又有什么关系呢？从以往的经验与实践中，我们都知道影响网页性能最大的因素是浏览器的重绘（reflow）和重排版（repaint）。React背后的Virtual Dom就是尽可能地减少浏览器的重绘和重排版。

![](../assets/chrome-rendering-process-eg.png)
![](../assets/firefox-rendering-process-eg.jpeg)

对于性能优化这个主题，我们往往会基于“不信任”的前提，即我们需要提高 React Virtual Dom 的效率。从 React 的渲染过程来看，如何防止不必要的渲染可能是最需要去解决的问题。

React决定视图是否渲染包含两个方面，一个是对状态的管理，一个是基于变化状态属性是否执行渲染。

通过调用 this.setState 改变 state 驱动视图。
通过调用 this.forceUpdate 强制更新视图。
通过操作原生 dom 更新视图。
通过改变 props 驱动视图（redux 或者 修改父子组件传递 props ）。

一直对React组件的生命周期理解的不够深刻，例如在React官网中，有这样一句话来描述shouldComponentUpdate()方法：
> shouldComponentUpdate() is invoked before rendering when new props or state are being received.

我对这句话的理解是：shouldComponentUpdate()只有在props或state更新的时候才会被调用。于是很自然的，我一直默认这样一种场景：当父组件进行重新渲染(re-render)操作的时候，如果子组件的props或state没有改变，那么子组件就不会调用shouldComponentUpdate()，进而也不会调用render()方法。但是，事实是这样的吗？

​ 我们建立这样一个场景：父组件能够周期性的进行渲染，子组件接收父组件传递的一个props，但并不曾改变它，即验证该场景下shouldComponentUpdate()是否会被调用。父组件的render()方法如下：



## 参考资料

* [使用React.memo()来优化函数组件的性能][1]
* [CSS Animation性能优化][2]
* [重排重绘，看这一篇就够了][3]
* [聊一聊 React 中更新 ui 视图的几种方式][5]
* [重排与重绘][4]

[1]: https://juejin.im/post/5c8edf626fb9a0710d65c7fc
[2]: https://github.com/amfe/article/issues/47
[3]: https://juejin.im/entry/582f16fca22b9d006b7afd89
[5]: https://juejin.im/post/5bb9c932f265da0aca332226
[4]: https://imweb.io/topic/5c2206a7611a25cc7bf1d848
