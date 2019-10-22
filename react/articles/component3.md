# 认识React组件基础篇——有状态组件&无状态组件

## 概念辨析


无状态组件(Stateless Component )和有状态组件(Stateful Component)，划分依据是根据组件内部是否维护state。无状态组件内部不使用state，只根据外部组件传入的props返回待渲染的React元素。有状态组件内部使用state，维护自身状态的变化，有状态组件根据外部组件传入的props和自身的state，共同决定最终返回的React 元素。

以是否有自身状态需要维护，React中的组件可以分为无状态组件（Stateless Component）和有状态组件（Stateful Component）两类。这个组件分类还是很容易理解，但还是需要注意的一点如下：

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

上面的两种写法看起来是等价的，并且都没有自身的state需要维护，这时候可能有的同学会把下面的类组件也当成无状态组件，但其实，只有无状态的函数组件才能称为无状态组件。自从16.8版本hooks横空出世以后，函数组件也可以维护自身的state，因为不能像以前那样，把函数组件等价为无状态组件。

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

上述函数组件肯定不能称为无状态组件了。

## 无状态组件

无状态组件主要用来定义模板，接收来自父组件props传递过来的数据，使用{props.xxx}的表达式把props塞到模板里面。无状态组件应该保持模板的纯粹性，以便于组件复用。创建无状态组件如下：

``` js
const Header(props) {
  return <div className={`${props.headStyle}`}>{props.title}</div>
};
```

然后我们使用箭头函数+解构能够写出更加简介的代码

``` js
const Header = ({headStyle, title='xxx'}) => (
  <div className={`${headStyle}`}>{title}</div>
)
```

## 有状态组件

有状态组件主要用来定义交互逻辑和业务数据（如果用了Redux，可以把业务数据抽离出去统一管理），使用{this.state.xxx}的表达式把业务数据挂载到容器组件的实例上（有状态组件也可以叫做容器组件，无状态组件也可以叫做展示组件），然后传递props到展示组件，展示组件接收到props，把props塞到模板里面。创建有状态组件如下：

``` js
class ButtonCounter extends React.Component {
  constructor() {
    super()
    this.state = { clicks: 0 }
    this.handleClick = this.handleClick.bind(this)
  }
 
  handleClick() {
    this.setState({ clicks: this.state.clicks + 1 })
  }
 
  render() {
    return (
      <Button
        onClick={this.handleClick}
        text={`You've clicked me ${this.state.clicks} times!`}
      />
    )
  }
}
```

如您所见，第二个组件的 constructor(构造函数) 包含一个组件 state(状态)，而第一个组件是一个简单的组件，通过 props(属性) 渲染文本。有状态组件和无状态组件的划分看起来非常简单，但可以使 Button 组件具有高度可重用性。