# React Hooks全面学习

关于Hooks几个需要记住的点：
* 每一次渲染都有它自己的 `Props and State`
* 每一次渲染都有它自己的事件处理函数
* 每次渲染都有它自己的 `Effects`

> 到目前为止，我们可以明确地喊出下面重要的事实：每一个组件内的函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获某次渲染中定义的props和state。

## 参考资料

* [深入浅出 React Hooks][1]
* [30分钟精通React Hooks][2]
* [精读《React Hooks》][3]
* [React Render Props][4]
* [React 状态提升][5]
* [React Hooks: What's going to happen to render props?][6]
* [Epitath 源码 - renderProps 新用法][7]
* [FEX 技术周刊 - 2019/09/23][8]
* [From Hooks to... Render Props?][9]
* [React hooks实践](https://juejin.im/post/5c4d7122e51d4556940c15cb)
* [react hooks的一些总结，和一些需要注意的点](https://zhuanlan.zhihu.com/p/69153191)
* [使用 Mobx + Hooks 管理 React 应用状态](https://zhuanlan.zhihu.com/p/114292057)
* [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

* [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)
* [译][使用React Hooks请求数据](https://zhuanlan.zhihu.com/p/61511310)

[1]: https://juejin.im/post/5cf475d66fb9a07ea944594e
[2]: https://juejin.im/post/5be3ea136fb9a049f9121014
[3]: https://juejin.im/post/5be8d3def265da611a476231
[4]: https://zh-hans.reactjs.org/docs/render-props.html
[5]: https://zh-hans.reactjs.org/docs/lifting-state-up.html
[6]: https://kentcdodds.com/blog/react-hooks-whats-going-to-happen-to-render-props
[7]: https://github.com/dt-fe/weekly/tree/master
[8]: http://fex.baidu.com/blog/2019/09/fex-weekly-23/
[9]: https://frontarm.com/james-k-nelson/hooks-vs-render-props/

## 关于hooks优雅实现的库

* [beautiful-react-hooks](https://github.com/antonioru/beautiful-react-hooks)