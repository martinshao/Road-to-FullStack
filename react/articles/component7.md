# React组件设计技巧——高阶组件和函数子组件

## 关键字

* 复用(multiplexing): 具体指代码复用，通常涉及到抽象，抽离，封装等概念
* 增强(enhance): 具体指功能增强，一种特殊的代码复用技术，增强器可复用，对特定组件进行功能增强
* 横切关注点: 直接的业务关注点，是直切关注点。而为直切关注点提供服务的，就是横切关注点。

这篇文章着重介绍一些React组件的设计技巧，让组件更具有可读性，可复用性。

## 属性渲染(Render Props)

术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。
具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。

组件是 React 代码复用的主要单元，但如何分享一个组件封装到其他需要相同 state 组件的状态或行为并不总是很容易。

``` js
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

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

## 高阶组件(HOC -> High Order Components)

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
