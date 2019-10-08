# React组件设计技巧——高阶组件和函数子组件

这篇文章着重介绍一些React组件的设计技巧，让组件更具有可读性，可复用性。

Render Props

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

HOC

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。

``` js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

FACC

``` js
const ClassNameWrapper = ({ children }) => children('demo-class')

// 使用

const HeadWithClass = (props) => (
  <ClassNameWrapper>
    {(class) => <header classNmae={class} ></header>}
  </ClassNameWrapper>
)
```

this.props.children



## 参考资料

* [前端解读面向切面编程(AOP)][1]
* [用AOP改善javascript代码][2]
* [深入浅出 Javascript Decorators 和 AOP 编程][3]
* [Mixins Considered Harmful][4]
* [高阶组件][5]
* [React中的函数子组件(FaCC)和高阶组件(HOC)][6]
* [React 中的 Render Props][7]

[1]: https://juejin.im/post/5bd2fbfef265da0aca335198
[2]: http://www.alloyteam.com/2013/08/yong-aop-gai-shan-javascript-dai-ma/
[3]: https://juejin.im/entry/5a12443951882512a860e93c
[4]: https://zh-hans.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html
[5]: https://zh-hans.reactjs.org/docs/higher-order-components.html
[6]: https://segmentfault.com/a/1190000016269347
[7]: https://juejin.im/entry/5a151f4b518825296421555e