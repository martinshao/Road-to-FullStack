

# React 从入门到精通

## 1-React系列总结文章大纲

* 认识React ，已经React全家桶成员，还有很多衍生框架
* React生命周期的变更，以及变更的原因
* React组件的介绍，各种组件的应用
* React类组件需要特殊注意事项
* React类组件和生命周期
* React函数组件和Hooks
* React事件机制
* React相关原理解析

## 2-React全家桶好用的插件

* `prop-types`: 类型检查插件
* `classnames`: 样式处理插件
* `react-css-module`: 样式处理插件
* `react-powerplug`: 基于 `render props` 的插件库，想更加深刻理解 `render props` 可以看下源码
* `Reselect`: 库可以创建可记忆的(Memoized)、可组合的 selector 函数。[Reselect](https://github.com/reduxjs/reselect)
* `redux-actions` redux状态管理变得更加简单 [redux-actions入门](https://juejin.im/post/5b41641ef265da0f8202126d)
* `recompose`: 可以看做React技术栈的lodash，提供了许多用于创建react函数式组件和高阶组件的工具函数，包括compose、branch、withState、withStateHandlers等。[recompose](https://github.com/acdlite/recompose)
* `mitt`: 关于 EventEmitter 我想应该很多同学都很熟悉了。简而言之是一个事件的发布与订阅器。这两天读到了一些非常有意思的小库，虽然小但是功能完备，比如说这次我们要讲解的 Mitt。[Mitt](https://github.com/developit/mitt)
* `SWR`: SWR is a React Hooks library for remote data fetching. [SWR](https://github.com/zeit/swr)
* `react-beautiful-dnd`: Beautiful and accessible drag and drop for lists with React. [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) https://react-beautiful-dnd.netlify.com
* `awesome-react-hooks`: Awesome React Hooks Resources
* `useHooks`: Easy to understand React Hook recipes by Gabe Ragland [useHooks](https://usehooks.com/)

## 3-React组件类型一网打尽系列

1. [认识React组件基础篇——类组件&函数组件][31]
2. [认识React组件基础篇——受控组件&非受控组件][32]
3. [认识React组件基础篇——无状态组件和有状态组件][33]
4. [React组件设计技巧——展示型组件和容器型组件][34]
5. [React组件设计技巧——木偶组件和聪明组件][35]
6. [React组件设计技巧——高阶组件和函数子组件][36]
7. [React组件性能优化——PureComponent][37]
8. [React组件新能优化——Memo组件][38]
9. [React组件新能优化——lazy和suspense][39]

## 4-React基础知识详解系列

1. [React生命周期大总结(含新旧版本对比)][41]

## 5-React黑魔法Hooks

1. [hooks介绍与基本应用][42]
2. [hooks原理与源码解析][43]
3. [hooks使用实践及注意事项][44]
4. hooks造轮子之Redux实现
5. hooks造轮子之……
6. 大神文章推荐
   1. [A Complete Guide to useEffect](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
   2. [理解 React Hooks 的 Capture Value 特性](https://segmentfault.com/a/1190000018685253)
   3. [精读《useEffect 完全指南》](https://segmentfault.com/a/1190000018639033)
   4. [一文彻底搞懂react hooks的原理和实现](https://juejin.cn/post/6844903975838285838)
   5. [How Does React Tell a Class from a Function?](https://overreacted.io/how-does-react-tell-a-class-from-a-function/)

## 6-React原理深度解析系列

1. React原理之 JSX转换
2. React原理之 FiberRoot构建过程（未完成）
3. React 原理之Fiber调度过程
4. React 原理之Fiber更新过程
5. React 原理之React hooks
6. React 原理之 合成事件
   1. [由浅到深的React合成事件](https://juejin.cn/post/6844903988794671117)
7. React 原理之 setState
   1. [React setState 数据更新机制](http://121.40.166.6/docs/advanced/react/setState.html)
   2. [setState的执行机制](https://johninch.github.io/Roundtable/Question-Bank/react/setState.html)
   3. [【React】setState的执行机制](https://github.com/swiftwind0405/blog/issues/60)
   4. [React - setState源码分析（小白可读）](https://juejin.cn/post/6844903573453537287)
   5. [React中的Transaction](https://oychao.github.io/2017/09/25/react/16_transaction/)
   6. [React transaction完全解读](https://segmentfault.com/a/1190000021303172)

## 7-React 状态管理
1. Redux介绍与原理解析
2. react-redux源码分析
3. Redux中间件:redux-thunk、redux-saga
4. 深度封装的状态库:dva
5. Mobx原理
6. Rxjs 原理

7. jutai
8. Recoil
9. Zustand
10. Xstate

## 7-React 路由

1. Redux介绍与原理解析
1. react-redux源码分析
1. Redux中间件:redux-thunk、redux-saga
1. 深度封装的状态库:dva
1. Mobx原理
1. React路由管理与react-router
1. react-router原理与源码解析


## 8-React周边--好用的项目收集

* [react-admin react后台管理框架][1]

[1]: https://github.com/yezihaohao/react-admin

## 9-React 造轮子系列

### 优秀轮子源码学习
* [react-component/dialog](https://github.com/react-component/dialog) antd出品

## 10-React 组件设计原则

## 11-React 开发技巧

1. `React` 中常见 `eslint` 常见问题解析
2. `React` & `Redux` 中使用 `AJAX` 轮询
3. `React` 组件设计技巧&如何拆分组件

## 12-参考资料


* [7 Architectural Attributes of a Reliable React Component](https://dmitripavlutin.com/7-architectural-attributes-of-a-reliable-react-component)
* [可靠React组件设计的7个准则之SRP](https://juejin.im/post/5d4acb28e51d45620771f082)
* [How do you separate components?](https://reactarmory.com/answers/how-should-i-separate-components)
* [[译] 你是如何拆分组件的？](https://juejin.im/post/59aa7f8c6fb9a024747f13b7)
* [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)


[31]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/component1.md
[32]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/component2.md
[33]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/component3.md
[34]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/component4.md
[35]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/component5.md
[36]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/component6.md
[37]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/component7.md
[38]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/component8.md
[39]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/component9.md

[41]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/about-lifecycle.md
[42]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/about-hooks1.md
[43]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/about-hooks2.md
[44]: https://github.com/martinshao/Road-to-FullStack/blob/master/react/articles/about-hooks3.md