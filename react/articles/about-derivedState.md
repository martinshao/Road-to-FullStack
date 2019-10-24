# 关于Derived State(派生状态)的一切

## 派生状态（Derived State）和componentWillReceiveProps、getDerivedStateFromProps

* 什么是派生状态
* 什么时候使用派生状态
* 使用派生状态的常见bug

getDerivedStateFromProps只为了一个目的存在。它使得一个组件能够响应props的变化来更新自己内部的state。比如我们之前提到的根据变化的offset属性记录目前的滚动方向或者根据source属性加载额外的数据。

## 参考资料

* [React v16.4.0：你可能并不需要派生状态（Derived State）][1]
* [You Probably Don't Need Derived State][2]
* [你可能不需要使用派生 state][3]

[1]: https://juejin.im/post/5b3595e3f265da59a76c9ed4
[2]: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
[3]: https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html