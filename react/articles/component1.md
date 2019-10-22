# 认识React组件基础篇——类组件&函数组件

## 关键词

> * Functional Component -> 函数组件
> * Class Component -> 类组件
> * Stateless Component -> 无状态组件
> * Stateful Component -> 有状态组件
> * stateless function components -> 无状态函数组件
> * Controlled Component -> 受控组件
> * Uncontrolled Component -> 非受控组件
> * Presentational Component -> 展示组件
> * Container Component -> 容器组件
> * Dumb Components -> 木偶组件
> * Smart Components -> 聪明组件
> * PureComponent -> 纯组件
> * Higher Order Component -> 高阶组件(HOC)
> * Functions as Child Components -> 函数子组件(FaCC)

## 三种组件创建方式

![react](../assets/20191007211702.png "react")

如果用 `E=mc²` 揭示质能关系的本质的话，我觉得 `UI=f(data)` 能够揭示React作为一个视图层框架的本质。用React构建视图这句话就已经能说明很多问题，以往的开发我们用 `JQuery` 操纵dom或者模板拼凑页面，但到了React ，我们用函数和JSX利器，真正地完成了从 `JS -> DOM` 的转变。

如何使用React作为工具构建页面，与其说前端开发每天使用React写js，不如形象点的说是在写组件，通过组件层层嵌套或者组合构成完整页面，或应用。React从2013年推出发展至今（2019年），声明组件的方式也发生了不小的变化，这里先简单的介绍一下React组件的发展历程。

从 `React component` 的发展历程上来看，它主要是经历了一下三个阶段：

> 1. createClass Component
> 2. Class Component
> 3. Function Component

这个三个阶段也是React的组件不断走向轻量级的一个过程。其中 `Class Component` 完全替代了 `createClass Component` 成为了现在我们开发React组件的主流，而 `Function Component` 也在 `Hooks` 推出后摩拳擦掌，准备大干一场。下面就让我们去看看三者的具体情况吧。

需要格外说明的是，这篇文章着重对于 `React component` 发展的历史和组件的分类做一个阐述，具体深入到组件设计和使用方方面面的细节，都将在另外的文章给出答案。

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

在**0.14**版本发布之后，React迎来了 `Class component` 和 `Function class` ，直到如今 `Class component` 也是大多数组件的声明方式。顺理成章的，`React.createClass` 渐渐被淘汰，直到 **react 15.5版本** 不再为 React 官方所推介，并且让大家使用 `class component` 来代替它。而且在 **react 16版本** 发布后， `createClass` 更是被废弃，当我们使用它的时候，会提示报错，也就是说，在 React 团队看来 `createClass` 已经完全没有存在的必要了。**15.5版本**之后，React把 `createClass` 分离成独立的包 `create-react-class`，到**16版本**之后，就已经彻底删除该方法。

实际上，从17年开始，createClass就渐渐销声匿迹了，这里简单介绍，让大家感受一下React组件声明方式的发展历程。

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

**15.5版本**还有一个重大的改变就是，将之前的版本中我们可以通过 `React.PropTypes` 这个API访问React内置的一些类型来检查 `props` ，独立成了一个新的包 `prop-types`

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

`React.createClass` 的语法并不复杂，它通过 `createClass` 来创建一个组件，并通过 `propTypes` 和 `getDefaultProps` 来获取props，通过 `getInitialState()` 方法返回一个包含初始值的对象，虽然从现在看来还是有点麻烦，但总体上来看代码也比较清晰，跟现在的 `Class Component` 差别并不是太大。

其实 `Class Component` 完全替代 `React.createClass` 并不是说 `React.createClass` 有多坏，相反它还有一些 `class Component` 所没有的特性。它的废弃是由于ES6的出现，新增了 `class` 这一语法糖，让我们在 `JavaScript` 的开发中可以直接使用 `extends` 来扩展我们的对象，因此为了与标准的ES6接轨，原有的只在React中使用的 `createClass` 自然而然也成为了被抛弃的对象。

为了更好的展示 `createClass` 与 `Class component` 组件之间的区别，图示如下：
![createClass and class component](../assets/20191007165935.png 'createClass')

## Class component & Function component

上文提过，在React**0.14**版本发布之后， `Class component` 和 `Function component` 便成为主流的组件声明方式。这其中`Class component` 更是主流的主流。一般模版如下，值得一提的是，React的生命周期也在16版本发生了重大变化。在这之前，推荐的`class component` 的模版如下：

``` js
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class App extends Component {
  static propTypes = {
    name: PropTypes.string
    // ...
  }
  static defaultProps = {
    // ...
  }
  constructor(props) {
    super(props);

    this.state = {
      // ...
    }
  }
  componentWillMount() {
    // ...
  }
  componentDidMount() {
    // ...
  }
  componentWillReceiveProps(nextProps) {
    // this.setState({})
  }
  shouldComponentUpdate(nextProps, nextState) {
    // return true
  }
  componentWillUpdate(nextProps, nextState) {
    // ...
  }

  componentDidUpdate(prevProps, prevState) {
    // ...
  }
  render() {
    return <div>This is a demo.</div>
  }
}

export default App;
```

16.8版本之后的React取消了 `componentWillMount` ， `componentWillReceiveProps` ， `componentWillUpdate` ，取而代之的是 `getDerivedStateFromProps` ， `getSnapshotBeforeUpdate` ，这前后之间的具体区别则是另外一篇文章的事情了。

``` js
import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // 初始化state方式（1）
    this.state = {
      // ...
    }
  }

  static defaultProps = {
    // ...
  }

  // 初始化state方式（2）
  state = {
    // ...
  }
  static getDerivedStateFromProps(props, state) {
    return state
  }
  componentDidCatch(error, info) {
    // ...
  }
  render() {
    return <div>This is a demo.</div>
  }
  componentDidMount() {
    // ...
  }
  shouldComponentUpdate(nextProps, nextState) {
    // ...
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // ...
  }
  componentWillUnmount() {
    // ...
  }
}
export default App;
```

而在2019年的今年，随着React最新的一个大版本中，给我们带来了 Hooks：[React v16.8: The One With Hooks][101]，从而将 `Function component` 的能力提高了一大截，成功的拥有了可以与 `Class component` 抗衡的能力。

正如当初的 `createClass` 被遗忘在历史中一样，技术的演进本身就是一个新技术不断涌现，就技术不断被淘汰的过程，`Function component` 被增强早已命中注定。在前端开发越来越火热的今天，人们对于JavaScript这门语言的关注越来越多，`class component` 和 `Function component` 的存在，我觉得也正是JavaScript对于 **面向对象** 和 **函数式** 两种编程范式支持的一种体现，并且在越来越强调函数式编程的今天，增强 `Function component` 似乎就变成了一件水到渠成的事情了，因为我们不可能接受一个无法拥有自身状态（state）存在的组件。

在hooks出现之前，函数组件是不支持state，使用无状态的函数构建的组件称为无状态组件，这种构建方式是0.14版本之后新增的，并且官方也十分推崇。因为函数式编程的优越性在函数式组件上也得到了充分的体现。

无状态组件只传入props和context两个参数；也就是说，它不存在state，也没有生命周期方法，组件本身即上面两种React组件构建方法种的render方法。propTypes和defaultProps还是可以通过向方法设置静态属性来实现的。

这是一个函数式组件(Functional Component), 它和类组件(Class Component)最关键的区别就是: 函数式组件没有state和一系列的钩子函数,这也是函数式组件经常被用作无状态组件的原因
``` js
import React from 'react'

// functional component
function Button({color='color', text='Confirm'}) {
  return (
    <button className={`btn btn-${color}`}>
      <em>{text}</em>
    </button>
  )
}

export default Button;
```

> Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

在React 16.8版本之前，我们可以说无状态组件就是函数式组件，但是自从16.8版本hooks来临后，Function component也可以有自己维护的state状态。那么相比较从前，Function组件只比class组件缺少生命周期的管理了。

``` js
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

```js
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

上面的两种写法是等价的，但函数组件的写法要比类组件简洁，不过类组件比函数组件功能更加强大。类组件可以维护自身的状态变量，即组件的state，类组件还有不同的生命周期方法，可以让开发者能够在组件的不同阶段（挂载、更新、卸载），对组件做更多的控制。

类组件有这么多优点，是不是我们在开发中应该首选使用类组件呢？其实不然。函数组件更加专注和单一，承担的职责也更加清晰，它只是一个返回React 元素的函数，只关注对应UI的展现。函数组件接收外部传入的props，返回对应UI的DOM描述，仅此而已。当然，如上面例子所示，使用只包含一个render方法的类组件，可以实现和函数组件相同的效果。但函数组件的使用可以从思想上迫使你在设计组件时多做思考，更加关注逻辑和显示的分离，设计出更加合理的页面上组件树的结构。实际操作上，当一个组件不需要管理自身状态时，可以把它设计成函数组件，当你有足够的理由发现它需要“升级”为类组件时，再把它改造为类组件。因为函数组件“升级”为类组件是有一定成本的，这样就会要求你做这个改造前更认真地思考其合理性，而不是仅仅为了一时的方便就使用类组件。

函数式组件的优点：
* 函数式组件易于追溯.
* 函数式组件具有很好的可读性
* 易于测试,debug
* 有更好的性能
* 能更好的复用
* 能更好的降低代码之间的耦合

函数式组件与基于Class声明的组件比较：
* 不需要声明类，可以避免大量的譬如extends或者constructor这样的代码
* 不需要显示声明this关键字，在ES6的类声明中往往需要将函数的this关键字绑定到当前作用域，而因为函数式声明的特性，我们不需要再强制绑定。
* 更佳的性能表现:因为函数式组件中并不需要进行生命周期的管理与状态管理，因此React并不需要进行某些特定的检查或者内存分配，从而保证了更好地性能表现。
* 16.8版本之前不能进行状态管理，之后hooks提供的 useState useEffects 让函数组件也有了维护state处理副作用的能力。

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
* [Function 与 Classes 组件的区别在哪？][14]

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
[14]: https://juejin.im/post/5c80f4976fb9a049b7812679

[101]: https://reactjs.org/blog/2019/02/06/react-v16.8.0.html
[102]: https://stackoverflow.com/questions/30668464/react-component-vs-react-createclass
