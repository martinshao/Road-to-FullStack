# React组件设计技巧——高阶组件和函数子组件

![](https://img.alicdn.com/tfs/TB1gUE8lbj1gK0jSZFuXXcrHpXa-1200-630.png)

本篇是关于React组件系统文章的最后，往后会有部分的补充文章。本篇文章将介绍一些实用的组件设计技巧，无论是在最初设计还是重构阶段，能够一定程度优化代码。正如关键字所提到的那样，我们希望一些组件**更加健壮**，**更可复用**，另外一方面能够解决**功能增强**，**横切关注点**问题。我觉得成为一个好的React开发，要能够对组件有着一定深度的认识和理解，并且能够设计出优雅的组件，下面这些组件设计技巧应该能够信手拈来。

## 关键字

* 复用(multiplexing): 具体指代码复用，通常涉及到抽象，抽离，封装等概念
* 增强(enhance): 具体指功能增强，一种特殊的代码复用技术，增强器可复用，对特定组件进行功能增强
* 横切关注点(cross-cutting concerns): 直接的业务关注点，是直切关注点。而为直切关注点提供服务的，就是横切关注点。

代码复用应该算是一个老生常谈的话题，只要提到代码优化，提高复用性是逃避不开的话题。前端从jQuery操作DOM到VUE或React等框架，一个最大的改变，就是页面组件化，那么如何实现组件的复用，如何实现高可复用性的组件就是前端开发的重要工作之一。React框架构成应用的基石是什么？是组件？那么React的组件就是代码复用的主要单元。如何更好地抽象业务逻辑并且实现复用。更具体地说，如何分享一个组件封装到其他需要相同 `state` 组件的状态或行为，是我们设计优雅组件所需要思考的。

## 属性渲染(Render Props)

术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。



``` js
// render props
const Test = props => props.render('hello world')
const App = () => (
  <Test
    render={text => <div>{text}</div>}
  />
)
```

上面代码展示的那样， `Test` 组件具有 `render prop` 的特殊属性，该属性接受一个函数，该函数返回一个 `React` 元素并调用它而不是实现自己的渲染逻辑。更通俗的理解，`render props` 将如何render组件的事代理给了使用它的组件，但同时以参数的形式提供了需要重用的状态和方法给外部。实现UI的自定义和功能的重用。

我们还是拿React官方文档的例子进行说明如何使用 `render prop` 对于组件进行优化。

下面这个组件实现的功能是将鼠标移动的具体位置在页面上显示出来，这个主要的业务逻辑其实就是根据事件不断更新鼠标位置的x轴，y轴状态。



``` js
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>移动鼠标!</h1>
        <p>当前的鼠标位置是 ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
```

那么问题来了，现在我们有这么一个需求，界面上有一个老鼠图像，我们要根据鼠标的移动来控制老鼠的位置。有人说那这个简单，新构建一个展示型组件为老鼠组件，然后将下面代码中的P标签换成老鼠组件。

那么又有问题了，如果还有一个猫、狗、狮子等组件要复用鼠标移动这一行为，怎么办？如果不考虑组件复用的问题，采取硬编码的方式直接将行为和状态写进代码中，。但这肯定是违背我们复用代码的原则，更好的方式是如下：

``` js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

## 高阶组件(HOC -> High-Order Components)

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。

``` js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

``` js
import React, { Component } from 'React';
//高阶组件定义
const HOC = (WrappedComponent) =>
  class WrapperComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
}

//高阶组件使用
export default HOC(WrappedComponent)
```

## 函数子组件(FaCC -> Functions as Child Components)

在介绍函数子组件之前，首先让我们回顾一个神奇的属性 `props.children`

> 包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 `props.children` 传递给外层组件。有几种不同的方法来传递子元素：
> * 字符串字面量
> * JSX 子元素
> * JavaScript 表达式作为子元素
> * 函数作为子元素

具体形式我大致展示一下：

#### 字符串字面量:
``` html
<MyComponent>Hello world!</MyComponent>
```

#### JSX 子元素:
``` jsx
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

#### JavaScript 表达式作为子元素:
``` jsx
<MyComponent>{'foo'}</MyComponent>
```

#### 函数作为子元素:

``` jsx
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

而我们今天所要介绍的 `FaCC` 组件设计模式，就是基于最终一种 **函数作为子元素** 。在学习过HOC之后，知道高阶组件是对于原有组件的一种功能增强，亦可以说是对于某种业务逻辑的复用，那么现在HOC能够完成的功能，FaCC 基本也能够完成。

``` jsx
const ClassNameWrapper = ({ children }) => children('demo-class')

// 使用
const HeadWithClass = (props) => (
  <ClassNameWrapper>
    {(class) => <header classNmae={class} ></header>}
  </ClassNameWrapper>
)
```

> 1. 使用 HOC 解决横切关注点问题
> 2. 不要改变原始组件。使用组合。
> 3. 约定：将不相关的 props 传递给被包裹的组件。
> 4. 约定：最大化可组合性。
> 5. 约定：包装显示名称以便轻松调试。
> 6. 不要在 render 方法中使用 HOC。
> 7. 务必复制静态方法
> 8. Refs 不会被传递

## 参考资料

* [前端解读面向切面编程(AOP)][1]
* [用AOP改善javascript代码][2]
* [深入浅出 Javascript Decorators 和 AOP 编程][3]
* [Mixins Considered Harmful][4]
* [高阶组件][5]
* [React中的函数子组件(FaCC)和高阶组件(HOC)][6]
* [React 中的 Render Props][7]
* [横切关注点的两种实现方法][8]
* [之 横切关注点、通知、切点、连接点、引入、织入、创建切点][9]
* [了解AOP][10]
* [我想要 AOP — 使用 AOP 分离关注点][11]
* [JSX In Depth][12]
* [React's Render Props Pattern][13]

[1]: https://juejin.im/post/5bd2fbfef265da0aca335198
[2]: http://www.alloyteam.com/2013/08/yong-aop-gai-shan-javascript-dai-ma/
[3]: https://juejin.im/entry/5a12443951882512a860e93c
[4]: https://zh-hans.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html
[5]: https://zh-hans.reactjs.org/docs/higher-order-components.html
[6]: https://segmentfault.com/a/1190000016269347
[7]: https://juejin.im/entry/5a151f4b518825296421555e
[8]: https://blog.csdn.net/shendl/article/details/526362
[9]: https://my.oschina.net/u/2378713/blog/670056
[10]: http://www.uml.org.cn/mxdx/mxdx15.htm
[11]: https://keelii.com/2019/07/06/i-want-my-aop-cn/
[12]: https://reactjs.org/docs/jsx-in-depth.html#functions-as-children
[13]: https://www.robinwieruch.de/react-render-props-pattern
