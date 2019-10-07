# 关于React组件，我们会聊些什么

## 关键词

> * Functional Component -> 函数组件
> * Class Component -> 类组件
> * Controlled Component -> 受控组件
> * Uncontrolled Component -> 非受控组件
> * Stateless Component -> 无状态组件
> * Stateful Component -> 有状态组件
> * Presentational Component -> 展示组件
> * Container Component -> 容器组件
> * Dumb Components -> 木偶组件
> * Smart Components -> 聪明组件
> * PureComponent -> 纯组件
> * Switching Component
> * Higher Order Component -> 高阶组件(HOC)
> * Functions as Child Components -> 函数子组件(FaCC)

## 介绍组件系统

React是一个视图层框架，换句话说，视图的构成由React的组件构成。React发展至今，声明组件的方式也发生了不小的变化，这里先简单的介绍一下React组件的发展历程。

随着 react 最新的一个大版本中，给我们带来了 Hooks：[React v16.8: The One With Hooks][101]，从而将 Function component 的能力提高了一大截，成功的拥有了可以与 Class component 抗衡的能力。但话说回来，虽然 Hooks 看起来很美好，最近也有不少文章都讲解了Hooks这一“黑魔法”，但技术的不断演进，本身就是一个解决以往所存在问题的过程，因此我个人认为着眼于现在，回望过去，去看一看 react component 的发展之路，去看看 Class component 以及 Function component 为什么会出现以及它们出现的意义，所要解决的问题，也对于我们全面了解 react 是很有帮助的。

从 react component 的发展历程上来看，它主要是经历了一下三个阶段：

> 1. createClass Component
> 2. Class Component
> 3. Function Component

这个三个阶段也是react的组件不断走向轻量级的一个过程。其中 Class Component 完全替代了 createClass Component 成为了现在我们开发 react 组件的主流，而 Function Component 也在 Hooks 推出后磨刀霍霍，准备大干一场。下面就让我们去看看三者的具体情况吧~

注：这篇文章整体只是对React Component的发展历程的一个概括或者说是我自己学习后的一个整理，想要详细了解，还请看看我在文章贴的那些链接。

用 `React.createClass` 构建组件是React最传统、也是兼容性最好的方法。在**0.14**版本发布之前，这一直都是React官方唯一指定的组件写法。示例如下：

``` js
import React from 'react'

const MyComponent = React.createClass({

  propTypes: {
    color: React.PropTypes.string,
    text: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      color: 'blue',
      text: 'Confirm'
    };
  },

  getInitialState() {
    return {
      placeholder: this.props.initialValue || ''
    };
  },
  render() {
    const { placeholder } = this.state;
    const { color, text } = this.props;

    return (
      <div>
        <input type="text" placeholder={placeholder} />
        <button className={`btn btn-${color}`}>
          <em>{text}</em>
        </button>
      </div>
    )
  }
})
```

在**0.14**版本发布之后，React迎来了 `Class component` 和 `Function class` ，直到如今 `Class component` 也是大多数组件的声明方式。顺理成章的，`React.createClass` 渐渐被淘汰，直到被遗弃在历史的垃圾堆里。**15.5版本**之后，React把 `createClass` 分离成独立的包 `create-react-class`，到**16版本**之后，就已经彻底删除该方法。

``` js
// 15.4 以前
var React = require('react');

var Component = React.createClass({
  mixins: [MixinA],
  render() {
    return <Child />;
  }
});

// 15.5 以后
var React = require('react');
var createReactClass = require('create-react-class');

var Component = createReactClass({
  mixins: [MixinA],
  render() {
    return <Child />;
  }
});
```

**15.5版本**还有一个重大的改变就是将在之前的版本之中，我们可以通过React.PropTypes这个API访问React内置的一些类型来检查props，独立成了一个新的包 prop-types

``` js
// 15.4 以前
import React from 'react';

class Component extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

Component.propTypes = {
  text: React.PropTypes.string.isRequired,
}

// 15.5 以后
import React from 'react';
import PropTypes from 'prop-types';

class Component extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

Component.propTypes = {
  text: PropTypes.string.isRequired,
};
```

为了更好的展示createClass与Class component组件之间的区别，图示如下：
![createClass and class component](../assets/20191007165935.png 'createClass')

## 首先是分类

react的组件类型是五花八门，暂时也没有一个定性的标准去划分不同的组件，笔者只是针对现有出现的组件做一些介绍。

## Class组件和Function组件

## 受控组件和非受控组件

## Smart组件和Dumb组件

## PureComponent

解决React组件渲染性能优化的问题。重点是在 `shouldComponentUpdate` 这个生命上面。

## 高阶组件

## `Portals` 、 `Suspense` 、 `Memo`

关键词：  
`wrapped functions` 、 `memoization` 、

关键词：

父子组件、mixin、继承、函数式编程、Higher-order function、compose、curry等等

> 重点
> 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。
>
> 1. 使用 HOC 解决横切关注点问题
> 2. 不要改变原始组件。使用组合。
> 3. 约定：将不相关的 props 传递给被包裹的组件。
> 4. 约定：最大化可组合性。
> 5. 约定：包装显示名称以便轻松调试。
> 6. 不要在 render 方法中使用 HOC。
> 7. 务必复制静态方法
> 8. Refs 不会被传递

## 参考资料

* [新手学习 react 迷惑的点(一)][1]
* [新手学习 react 迷惑的点(二)][2]
* [［译］Smart and Dumb Components][3]
* [React（四）：Smart组件与Dumb组件][4]
* [React 中的各种组件][5]
* [React 组件模式-有状态组件......][6]
* [React 深入系列２：组件分类][7]
* [React创建组件的三种方式及其区别][8]
* [React组件介绍][9]
* [React + TS 2.8：终极组件设计模式指南][10]
* [【译】 React官方：函数组件与类组件的差异 ？][11]
* [React（二）：类组件、函数式组件][12]
* [五分钟，聊一聊React Component的发展历程][13]

[1]: https://juejin.im/post/5d6be5c95188255aee7aa4e0
[2]: https://juejin.im/post/5d6f127bf265da03cf7aab6d
[3]: https://segmentfault.com/a/1190000004111786
[4]: https://blog.csdn.net/u012131835/article/details/83823977
[5]: https://zhuanlan.zhihu.com/p/30659051
[6]: https://www.html.cn/archives/9458
[7]: https://www.jianshu.com/p/5a34090077f3
[8]: https://www.cnblogs.com/wonyun/p/5930333.html
[9]: https://www.jianshu.com/p/2a40300a7884
[10]: https://segmentfault.com/a/1190000015326439
[11]: https://juejin.im/post/5c98310ff265da612d634730
[12]: https://juejin.im/post/5c0dfa265188257a5a2514d6
[13]: https://www.jianshu.com/p/5a6d44e1ca9e

[101]: https://reactjs.org/blog/2019/02/06/react-v16.8.0.html
