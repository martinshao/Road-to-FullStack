# React生命周期大总结(含新旧版本对比)

React近年版本升级变化

* **react 16.X** 引入了Fiber，全新的核心算法—— `reconciliation`
* **react 16.3** 引入了新生命周期 `getDerivedStateFromProps` 、 `getSnapshotBeforeUpdate` ，为不安全生命周期引入别名 `UNSAFE_componentWillMount`， `UNSAFE_componentWillReceiveProps` 和 `UNSAFE_componentWillUpdate` 。
* **react 16.4** 新生命周期 `getDerivedStateFromProps` 做了一些调整
* **react 16.9** 为 `componentWillMount` ， `componentWillReceiveProps` 和 `componentWillUpdate` 启用弃用警告。
* **react 17.X**（未来）删除 `componentWillMount` ， `componentWillReceiveProps` 和 `componentWillUpdate` 。

React 2013年推出至今（2019年）已经有6年时间，这期间 React 的生命周期发生了巨大的变化。一方面研究生命周期产生了那些变化，原因是什么？解决了什么问题？另外一方面也是对React生命周期更深入的理解，以及如何更好的使用。

首先，React 推出至今在我的认知里发生过一次大改动和一次小改动。**React 16** 版本由于使用了全新的核心算法架构 Fiber，由此对于新老生命周期做了一些改动。**React 16** 版本之前的生命周期如下：

![react lifecycle](../assets/20191017194429.png "react lifecycle")

另外还有一个有意思的图放在这里做一个比较。这里对比的是早先 `createClass` 新建组件的生命周期钩子函数和现在 `ES6 Classes` 方式新建组件的生命周期钩子函数的对比，可以看出虽然不尽相同，但是大多数还是保持一直，并且大多数生命周期的一直沿用至今，知道 **React 16.X** 版本的出现

![class createClass](../assets/20191007165935.png "class createClass")

16.8 版本之前的生命周期钩子函数研究一下，下面是生命周期对应的钩子函数：

* `constructor()`
* `componentWillMount()`
* `componentDidMount()`
* `componentWillUnmount()`
* `componentWillReceiveProps(nextProps)`
* `shouldComponentUpdate(nextProps, nextState)`
* `componentWillUpdate(nextProps, nextState)`
* `componentDidUpdate(prevProps, prevState)`
* `render()`

首先我们研究一下钩子函数具体执行顺序：

![hooks function sort](../assets/3703585223-5a90fadf9d735.png "hooks sort")

这张图详细的给出了钩子函数的执行顺序，另外一个细节就是 `setState` 方法能够执行的钩子函数也给明确的指出来了。

为了更加生动的显示的钩子函数的执行顺序，给出了这样一个示例代码：

``` jsx
class SubCounter extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor-----------------sub', '11、子组件构造器');
    this.state = {
      number: this.props.number
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({number: nextProps.number});
    console.info('sub', nextProps)
    console.log('componentWillReceiveProps---sub', '12、子组件将要接收到新属性');
  }

  componentWillMount() {
    console.log('componentWillMount----------sub', '13、子组件挂载之前');
  }

  componentDidMount() {
    console.log('componentDidMount-----------sub', '17、子组件挂载完成');
    console.log("%c-------------------------------------------------------", "color:red");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate-------sub', '14、子组件是否需要更新');
    if (nextProps.number < 5) return true;
    return false
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate---------sub', '15、子组件将要更新');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate----------sub', '18、子组件更新完成');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount---sub', '19、子组件将卸载');
  }

  render() {
    console.log('render----------------------sub', '16、子组件挂载中');
    console.log("%c-------------------------------------------------------", "color:skyblue");
    return (
      <p>{this.props.number} - {this.state.number}</p>
    )
  }
}

class Counter extends React.Component {
  static defaultProps = {
    //1、加载默认属性
    name: 'sls',
    age: 23
  };

  constructor(props) {
    super(props);
    //2、加载默认状态
    this.state = {
      number: 0,
    }
    console.log('constructor---sub', '1、父组件构造器');
    // this.test = this.test.bind(this);
  }

  componentWillMount() {
    const state1 = ['x'];
    const state2 = update(state1, {$push: ['y']}); // ['x', 'y']
    console.info(state2);
    console.log('componentWillMount----------counter', '3、父组件挂载之前');
  }

  componentDidMount() {
    console.log('componentDidMount-----------counter', '7、父组件挂载完成');
    console.log("%c-------------------------------------------------------", "color:red");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate-------counter', '4、父组件是否需要更新');
    if (nextState.number < 15) return true;
    return false
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate---------counter', '5、父组件将要更新');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate----------counter', '8、父组件更新完成');
  }

  handleClick = () => {
    const { number } = this.state
    this.setState({
      number: number + 1,
    })
  };

  render() {
    console.log('render----------------------counter', '6、render(父组件挂载)');
    console.log("%c-------------------------------------------------------", "color:yellow");
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        {this.state.number < 10 ? <SubCounter number={this.state.number} /> : null}
      </div>
    )
  }
}
```

对照的console打印出的日志，对于生命周期执行顺序有个更深刻的记忆。我认为这算是React最基础的知识点之一，请务必记住。

![](../assets/lifecycle168.png)

## 各生命周期讲解与注意事项

#### constructor

构造器的问题涉及到四个比较值得讨论的问题：

1. 是否需要constructor与不用的影响;
2. constructor是否要调用super;
3. super中是否传入props与注意事项;
4. state初始化位置和注意事项;

*1. 是否需要constructor与不用的影响* constructor 并不是React提出的，这是ES6对类的默认方法，通过 new 命令生成对象实例时自动调用该方法。并且，该方法是类中必须有的，如果没有显示定义，则会默认添加空的constructor()方法。所以有时候我们可以不用在类组件中调用一次constructor，这对于后面使用设置使用 state 和 props 完全没有任何影响。

``` jsx
import React from 'react'

class MyClass extends React.Component {
  state = {
    count: 0
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <span>{this.props.title}</span>
        <span>{count}</span>
        <button onClick={() => {this.setState({count: count+1})}}>增加1</button>
      </div>
    )
  }
}

ReactDOM.render(<MyClass title={"标题"} />, document.getElementById('root'));
```

*2. constructor是否要调用super* 上面的例子我们知道，我们可以不用自己调用constructor，而是把这个工作交给组件。但是换句话说，如果你一旦调用了constructor 也就必须要调用super。关于这一点还是因为 ES6 的特性导致，在ES6中使用class实现继承，子类必须在constructor方法中调用super方法，否则新建实例时会报错(如果不调用 super 报错： `ReferenceError: this hasn't been initialised - super() hasn't been called`)。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。我们React组件一般都是继承 React.component ，存在这样的继承关系，就意味着在自调用constructor时必须声明super。

> 建立class时，当且仅当“使用了extends关键字并指定了constructor函数”，super关键字必须以super([arg1[, arg2...  argN]])的形式使用一次。此时super([arg1[, arg2...  argN]])相当于创建了一个对象，且以该对象为context调用extends关键字指示的函数（以new的形式），随后这个对象成为constructor函数的context。因此super([arg1[, arg2...  argN]])必须出现在constructor函数内的第一个this关键字之前，否则会报“this is not defined”的ReferenceError。亦可以super . IdentifierName的形式出现（这就与是否使用了extends关键字无关了）。super.IdentifierName作为getter使用时，表示函数B的prototype属性对象的[[prototype]]；super.IdentifierName作为setter使用时，super表示this。

``` js
class Super {
  constructor() {
    //do something
  }
}

class Sub extends Super {
  constructor() {
    super();
    //do something else
  }
}

//=========等价于=========

function Super() {
  //do something
}

function Sub() {
  Sub.prototype.__proto__ = Super.prototype; //extends
  Super.call(this); //constructor中的super
  //但是其实这个地方严格讲是有问题的
  //在使用ES6 class的时候，constructor并不负责创建成员函数
  //但是在用Constructor function时，一个function要管所有的
  //成员变量和函数的创建。
  //而Super里的所有东西都释放到当前上下文this中是不合适的
  //会出现命名冲突之类的
  //babel的具体的实现要比这个复杂很多。

  //do something else
}
```

*3. super中是否传入props与注意事项* 在constructor中必须要调用super在上面我们已经说明，那么传入 props 又是什么情况？

``` jsx
class MyClass extends React.component{
  constructor(props){
    super();
    console.log(this.props); // this.props is undefined
  }
  render() {
    const { count } = this.state;
    return (
      <span>{this.props.title}</span> // 显示标题
    )
  }
}
```

上面代码就是答案，如果我们想在 constructor 中拿到 props 的话就必须转入 props。除此之外，在组件其他地方React会自动为你设置好props属性。

*4. state初始化位置和注意事项* 一般认为初始化state状态的位置有两种：
1. 一种是作为类组件的属性声明在类里面；
2. 声明在构造函数里面，声明在这里面的好处是可以制造 派生状态(derived state)。

两种方式的效果差不多，差别在于第二种方式能够进行一些计算，利用props。

``` js
class MyClass extends React.Component {
  state = {
    loopsRemaining: this.props.maxLoops,
  }
}

class MyClass extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loopsRemaining: this.props.maxLoops,
    };
  }
}
```

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
![](../assets/lifecycle169.png)

挂载:

* `constructor()`
* `static getDerivedStateFromProps(props, state)`
* `render()`
* `componentDidMount()`

更新:

* `static getDerivedStateFromProps(props, state)`
* `shouldComponentUpdate(nextProps, nextState)`
* `render()`
* `getSnapshotBeforeUpdate(prevProps, prevState)`
* `componentDidUpdate(prevProps, prevState, snapshot)`

卸载:
* `componentWillUnmount()`

错误处理:
* `static getDerivedStateFromError(props, state)`
* `componentDidCatch()`


## 官方升级规划

逐步迁移路径

React遵循语义版本控制, 所以这种改变将是渐进的。我们目前的计划是：

16.3：为不安全生命周期引入别名UNSAFE_componentWillMount，UNSAFE_componentWillReceiveProps和UNSAFE_componentWillUpdate。 （旧的生命周期名称和新的别名都可以在此版本中使用。）
未来的16.9版本：为componentWillMount，componentWillReceiveProps和componentWillUpdate启用弃用警告。 （旧的生命周期名称和新的别名都可以在此版本中使用，但旧名称会记录DEV模式警告。）
17.0：删除componentWillMount，componentWillReceiveProps和componentWillUpdate。 （从现在开始，只有新的“UNSAFE_”生命周期名称将起作用。）
请注意，如果您是React应用程序开发人员，那么您不必对遗留方法进行任何操作。即将发布的16.3版本的主要目的是让开源项目维护人员在任何弃用警告之前更新其库。这些警告将在未来的16.x版本发布之前不会启用。

我们在Facebook上维护了超过50,000个React组件，我们不打算立即重写它们。我们知道迁移需要时间。我们将采用逐步迁移路径以及React社区中的所有人。

## 派生状态（Derived State）和componentWillReceiveProps、getDerivedStateFromProps

* 什么是派生状态
* 什么时候使用派生状态
* 使用派生状态的常见bug

getDerivedStateFromProps只为了一个目的存在。它使得一个组件能够响应props的变化来更新自己内部的state。比如我们之前提到的根据变化的offset属性记录目前的滚动方向或者根据source属性加载额外的数据。