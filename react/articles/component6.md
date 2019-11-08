# React组件设计技巧——高阶组件和函数子组件

![](https://img.alicdn.com/tfs/TB1KsMClBr0gK0jSZFnXXbRRXXa-1200-630.png)

本篇是关于React组件系统文章的最后，往后会有部分的补充文章。本篇文章将介绍一些实用的组件设计技巧，无论是在最初设计还是重构阶段，能够一定程度优化代码。正如关键字所提到的那样，我们希望一些组件**更加健壮**，**更可复用**，另外一方面能够解决**功能增强**，**横切关注点**问题。我觉得成为一个好的React开发，要能够对组件有着一定深度的认识和理解，并且能够设计出优雅的组件，下面这些组件设计技巧应该能够信手拈来。

## 1、关键字

* 复用(multiplexing): 具体指代码复用，通常涉及到抽象，抽离，封装等概念
* 增强(enhance): 具体指功能增强，一种特殊的代码复用技术，增强器可复用，对特定组件进行功能增强
* 横切关注点(cross-cutting concerns): 直接的业务关注点，是直切关注点。而为直切关注点提供服务的，就是横切关注点。

代码复用应该算是一个老生常谈的话题，只要提到代码优化，提高复用性是逃避不开的话题。前端从jQuery操作DOM到VUE或React等框架，一个最大的改变，就是页面组件化，那么如何实现高可复用性的组件就是前端开发的重要工作之一。React框架构成应用的基石是什么？是组件？那么React的组件就是代码复用的主要单元。如何更好地抽象业务逻辑并且实现复用。更具体地说，如何分享一个组件封装到其他需要相同 `state` 组件的状态或行为，是我们设计优雅组件所需要思考的。

## 2、Mixin所带来的问题

Mixin带来的一些问题,总结下来主要是以下几点:

* 破坏组件封装性: Mixin可能会引入不可见的属性。例如在渲染组件中使用Mixin方法，给组件带来了不可见的属性(props)和状态(state)。并且Mixin可能会相互依赖，相互耦合，不利于代码维护。
* 不同的Mixin中的方法可能会相互冲突

## 3、高阶函数
![](https://img.alicdn.com/tfs/TB1TuIylrr1gK0jSZR0XXbP8XXa-1280-403.jpg)

在介绍高阶组件之前，先让我简单的介绍一下高阶函数 `(Higher-order function)` 。JavaScript其实一个蛮强大的语言，目前的状况是JavaScript既能支持 `OOP` 编程，也能支持 `FP` 编程。高阶函数就是函数式编程中一个较为重要的概念。JavaScript 语言能够实现高阶函数的基础是：函数即对象。JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，并且返回函数，这种函数就称之为高阶函数。

总结 `JavaScript` 函数具备以下性质：

* 函数可以作为参数被传递；
* 函数可以作为返回值输出。

一个最简单的高阶函数：

``` js
function add(x, y, f) {
  return f(x) + f(y);
}
```

当我们调用add(-5, 6, Math.abs)时，参数x，y和f分别接收-5，6和函数Math.abs，根据函数定义，我们可以推导计算过程为：

``` js
x = -5;
y = 6;
f = Math.abs;
f(x) + f(y) ==> Math.abs(-5) + Math.abs(6) ==> 11;
return 11;
```

## 4、高阶组件(HOC -> High-Order Components)

> 官方解读
> 
> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。
> 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

可以理解为高阶组件是一种组件的设计模式。正如上面提到的高阶函数那样，高阶组件的定义同样很简单，一个组件作为参数传入工厂函数，然后返回一个经过包装的组件。

``` haskell
// haskell 语言描述

hocFactory :: W: React.Component => E: React.Component;
```

``` js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

![](https://img.alicdn.com/tfs/TB1DpHqlHr1gK0jSZFDXXb9yVXa-2189-700.png)

### 4.1 知识体系总览

#### HOC实现：

1. 属性代理(Props Proxy)
2. 反向继承(Inheritance Inversion)

#### HOC功能：

* 代码重用，逻辑和引导抽象
* 渲染劫持（Render Highjacking）
* state(状态)抽象和操作
* props(属性)操作

#### 原则：

* 不要改变原始组件。使用组合。
* 约定：将不相关的 props 传递给被包裹的组件
* 约定：最大化可组合性
* 约定：包装显示名称以便轻松调试

#### 注意事项

* 不要在 render 方法中使用 HOC
* 务必复制静态方法
* Refs 不会被传递

### 4.2 属性代理(Props Proxy)

属性代理的高阶组件在形式上实现起来很简单，“属性代理”的命名也揭示了其本质，类似在属性上实现装饰者设计模式。

* 操作 props(属性)
* 通过 Refs 访问到组件实例
* 提取 state(状态)
* 用其他元素包裹 WrappedComponent

``` jsx
//高阶组件定义
const HOC = (WrappedComponent) =>
  class WrapperComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
}
//普通的组件
class WrappedComponent extends Component{
  render(){
    //....
  }
}

//高阶组件使用
export default HOC(WrappedComponent)
```

#### 4.2.1 操作props

说好了是属性代理，意味这我们可以在 Wrapper 组件中对属性进行读取、添加、编辑、删除等操作，并且传给 WrappedComponent 的 props(属性)。

``` jsx
const HOC = (WrappedComponent) =>
  class WrapperComponent extends Component {
    render() {
      const newProps = {
        name: 'HOC'
      }
      return <WrappedComponent
        {...this.props}
        {...newProps}
      />;
    }
  }
```

React 框架十分灵活，会给开发流出足够的想象空间，正如上面代码展示的那样，我们对于属性的操作是多么毫无限制。但好的代码应该是有所限制的，React 框架本身不提供这种限制，我们采用 **约定** 的方式实现这种限制。这种约定将在高阶组件的介绍中出现好几次。我们要说的第一个约定就是：
> **将不相关的 props 传递给被包裹的组件**。

> HOCs add features to a component. They shouldn’t drastically alter its contract. It’s expected that the component returned from a HOC has a similar interface to the wrapped component.

> HOCs should pass through props that are unrelated to its specific concern. Most HOCs contain a render method that looks something like this:

总结： 

1. HOC 能够为子组件添加特性，这些特性可以是我们抽离出的可复用的代码逻辑；
2. HOC 可以过滤出与自身相关的额外属性，“额外”一次针对原组件，HOC 可对 `extraProp` 进行处理；
3. HOC 应该透传与自身无关的props，不大幅度改变子组件约定。这样做是削弱侵入性对于子组件的影响，确保高阶组件返回新组件最大兼容原子组件。

``` jsx
render() {
  // Filter out extra props that are specific to this HOC and shouldn't be passed through.
  const { extraProp, ...passThroughProps } = this.props;

  // Inject props into the wrapped component. These are usually state values or instance methods.
  const injectedProp = someStateOrInstanceMethod;

  // Pass props to wrapped component.
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

`extraProp` 是HOC自身需要的，`passThroughProps`是与HOC无关需要透传的，`injectedProp` 是HOC为子组件添加的新特性。这种约定保证了 HOC 的灵活性以及可复用性。

#### 4.2.2 获得refs的引用

您可以使用 `ref`(引用) 访问 `this` （ `WrappedComponent` 的实例），但是您需要 `WrappedComponent` 完成正常的初始渲染过程才能计算 `ref`(引用) ，这意味着您需要从 `HOC` 的 `render` 方法中返回 `WrappedComponent` 元素 ，让 `React` 执行它的一致性比较过程，然后您将获得 `WrappedComponent` 实例的引用。

示例：在下面的示例中，我们将探索如何通过 `refs` 访问实例方法和 `WrappedComponent` 的实例本身

``` jsx
const refsHOC = (WrappedComponent) =>
  class wrapperComponent extends Component {
    storeRef(ref) {
      this.ref = ref;
    }
    render() {
      return <WrappedComponent
        {...this.props}
        ref = {::this.storeRef}
      />;
    }
  }
```

上面代码有个点比较不太常见： `::` 双冒号运算符，这是ES7的提案，还没有正式纳入到标准当中。

箭头函数可以绑定 `this` 对象，大大减少了显式绑定 `this` 对象的写法`（call、apply、bind）`。但是，箭头函数并不适用于所有场合，所以现在有一个提案，提出了“函数绑定”（function bind）运算符，用来取代 `call、apply、bind` 调用。

函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

``` js
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}
```

如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

``` js
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);
```

所以上述 `render()` 函数中写法的另外一种形式是：

``` jsx
render() {
  return <WrappedComponent
    {...this.props}
    ref = {this.storeRef.bind(this)}
  />;
}
```

下面是另外一种常用的写法：

``` jsx
function refsHOC(WrappedComponent) {
  return class wrapperComponent extends Component {
    proc(wrappedComponentInstance) {
      wrappedComponentInstance.method()
    }
    
    render() {
      const props = Object.assign({}, this.props, {ref: this.proc.bind(this)})
      return <WrappedComponent {...props}/>
    }
  }
}
```

渲染 `WrappedComponent` 时，将执行 `ref` 回调，然后您将获得对 `WrappedComponent` 实例的引用。这可以用于读取/添加实例 `props`(属性) 和调用实例方法。

遗憾的是上面的写法已经过时： `String` 类型的 `Refs` 已经是过时的API。
自React16更新之后，`React.forwardRef` API取代了之前 `String` 类型 `Refs` ，所以新的Ref和高阶组件新的实现方法如下：

``` jsx
// 高阶函数
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}

export default logProps;

// 被包装组件
const FancyBtn = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyBtn" onClick={props.handleClick}>
    {props.label}
  </button>
));

export default logProps(FancyBtn);

// 包装后的组件使用
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.fancyBtn = React.createRef();
  }

  componentDidMount() {
    this.fancyBtn.current.focus();
  }

  render() {
    return (
      <div>
        <FancyBtn
          label="Click Me"
          ref={this.fancyBtn}
          handleClick={this.handleClick}/>
      </div>
    );
  }
}

export default CustomTextInput;
```

对于 Refs 不是特别了解可以去官网了解一下：[转发 Refs](http://react.html.cn/docs/forwarding-refs.html)

#### 4.2.3 抽象 state(状态)

您可以通过向 WrappedComponent 提供 props(属性) 和回调来提取 state(状态)，非常类似于智能(Smart)组件如何处理非智能(Dumb)组件。有关更多信息，请参阅非智能(Dumb)和智能(Smart)组件。

示例：在以下提取 state(状态)示例中，我们非常规地提取 name 输入字段的值和 onChange 处理程序。 我说的是非常规，因为这不是很常规，但你必须看到这一点。

``` jsx
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        name: ''
      }
      
      this.onNameChange = this.onNameChange.bind(this)
    }
    onNameChange(event) {
      this.setState({
        name: event.target.value
      })
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange
        }
      }
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}

class MyInput extends React.Component {
  render() {
    console.info(this.props);
    return <input name="name" {...this.props.name}/>
  }
}

export default ppHOC(MyInput);
```

input 会自动成为 受控input。更多关于常规的双向绑定 HOC 请点击这个 链接

#### 4.2.4 用其他元素包裹 `WrappedComponent`

您可以将 `WrappedComponent` 与其他组件和元素包装在一起，以用于样式，布局或其他目的。 一些基本用法可以通过常规父组件来完成（参见附录B），但如前所述，但是你可以通过 HOC 获得更多灵活性。

例子：为样式目的而包裹

``` jsx
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      return (
        <div style={{display: 'block'}}>
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
}
```

### 4.3 反向继承

Inheritance Inversion(反向继承)实现方式：

``` jsx
const HOC = (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      return super.render();
    }
  }
```

如您所见，返回的HOC类（ Enhancer ）继承(extends) 了 WrappedComponent 。 它被称为 Inheritance Inversion(反向继承)，因为它不是用 WrappedComponent 来继承某些 Enhancer 类。而是被 Enhancer 被动继承。 通过这种方式，它们之间的关系似乎是 反向(inverse)。

反向继承允许 HOC 通过 this 访问 WrappedComponent 实例，这意味着它可以访问 state(状态)，props(属性)，组件生命周期方法和 render 方法。

我不会详细介绍你可以用生命周期方法来做什么，因为它不是 HOC 的特性，而是 React 的特性。 但请注意，使用 Inheritance Inversion(反向继承)，您可以为 WrappedComponent 创建新的生命周期方法。 记得总是这样调用 super.[lifecycleHook] ，这样就不会破坏 WrappedComponent 。

一致性比较处理（Reconciliation process）
在深入了解之前，让我们总结一些概念。

React 元素描述当 React 执行 一致性比较(reconciliation) 过程时将要渲染的内容。

React 元素有两种类型：String 和 Function。 字符串类型 React 元素（STRE）表示 DOM 节点，函数类型 React 元素（FTRE）表示通过继承 React.Component 创建的组件。 有关元素和组件的更多信息，请阅读 此文章。

在 React 的 一致性比较(reconciliation) 过程中，FTRE 将被解析为完整的 STRE 树（最终结果将始终是 DOM 元素）。

这非常重要，这意味着 Inheritance Inversion(反向继承) 的高阶组件无法保证解析完整的子树 。

Inheritance Inversion(反向继承) 的高阶组件无法保证解析完整的子树。

在学习 Render Highjacking(渲染劫持)时，将被证明这点非常重要。

你可以用 Inheritance Inversion(反向继承) 来做什么？
渲染劫持(Render Highjacking)
操作 state(状态)


#### 4.3.1 渲染劫持

它被称为 渲染劫持(Render Highjacking)，因为 HOC 控制了 WrappedComponent 的渲染输出，并且可以用它做各种各样的事情。

在渲染劫持中，您可以：

* 读取，添加，编辑，删除渲染输出的任何 React 元素中的 props(属性)
* 读取并修改 render 输出的 React 元素树
* 有条件地渲染元素树
* 把样式包裹进元素树（就像在 Props Proxy(属性代理) 中的那样）

注：render 是指 WrappedComponent.render 方法

您无法编辑或创建 WrappedComponent 实例的 props(属性)，因为 React 组件无法编辑它接收到的 props(属性)，但是您可以更改从 render 方法输出的元素的 props(属性)。

正如我们之前研究的那样，Inheritance Inversion(反向继承) 类型的 HOC 无法保证解析完整的子树，这意味着 渲染劫持(Render Highjacking) 技术有一些限制。经验法则是，使用 渲染劫持(Render Highjacking)，你可以完全操作 WrappedComponent 的 render 方法返回的元素树。如果该元素树包含函数式 React Component，那么您将无法操作该组件的子元素。它们被 React 的一致性比较过程推迟，直到它实际渲染到屏幕上。）

示例1：条件渲染。除非 this.props.loggedIn 不为 true ，否则此 HOC 将准确渲染 WrappedComponent 将渲染的内容。（假设 HOC 将收到 loggedIn props(属性)）

``` jsx
const HOC = (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      if (this.props.isRender) {
        return super.render();
      } else {
        return null;
      }
    }
  }
```

示例2：修改由 render 方法输出的 React 组件树。

``` jsx
const iiHOC = (WrappedComponent) =>
  class extends WrappedComponent {
    state = {
      inputValue: 'may the force be with you'
    }
    render() {
      const elementsTree = super.render();
      if (elementsTree && elementsTree.type === 'input') {
        var newProps = {
          value: this.state.inputValue,
          onChange: (event) => {this.setState({inputValue: event.target.value})}
        };
      }
      const props = Object.assign({}, elementsTree.props, newProps);
      const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children);
      return newElementsTree;
  }
}

class WrappedComponent extends Component{
  render(){
    return(
      <input value={'Hello World'} />
    )
  }
}
export default iiHOC(WrappedComponent)
//实际显示的效果是input的值为"may the force be with you"
```

运行的时候，我们就会发现原来的 input 非受控组件通过高阶组件变成了受控组件，拥有了双向数据绑定的特性。

#### 4.3.2 操作 `props` 和 `state`

HOC 可以读取，编辑和删除 `WrappedComponent` 实例的状态，如果需要，还可以添加更多的 `state(状态)`。 请记住，您正在弄乱 `WrappedComponent` 的 `state(状态)`，这会导致您破坏一些东西。 大多数情况下，HOC 应限于读取或添加 `state(状态)` ，而添加 `state(状态)` 时应该被命名为不会弄乱 `WrappedComponent` 的 `state(状态)`。

示例：通过访问 `WrappedComponent` 的 `props(属性)` 和 `state(状态)` 进行调试

``` jsx
export function IIHOCDEBUGGER(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
      return (
        <div>
          <h2>HOC Debugger Component</h2>
          <p>Props</p><pre>{JSON.stringify(this.props, null, 2)}</pre>
          <p>State</p><pre>{JSON.stringify(this.state, null, 2)}</pre>
          {super.render()}
        </div>
      )
    }
  }
}
```

这个 HOC 用其他元素包裹着 WrappedComponent ，并且还显示了 WrappedComponent 的实例 props(属性) 和 state(状态) 。Ryan Florence 和 Michael Jackson 教我了 JSON.stringify 技巧。您可以在 此处 查看调试器的完整实现。


## 5、属性渲染(Render Props)

术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。

**具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑。**

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

## 6、函数子组件(FaCC -> Functions as Child Components)

* Just render them within the Component
* Lifting State
* Component composition with children prop
* RENDER PROP COMPONENT
* RENDER PROP COMPONENT ALTERNATIVE: HIGHER-ORDER COMPONENT

![](https://img.alicdn.com/tfs/TB14lMllO_1gK0jSZFqXXcpaXXa-1200-450.png)

重要的是要记住，`render prop` 是因为模式才被称为 `render prop` ，你不一定要用名为 `render` 的 `prop` 来使用这种模式。事实上， 任何被用于告知组件需要渲染什么内容的函数 `prop` 在技术上都可以被称为 “render prop”。

函数子组件本质上了属性渲染没有什么区别，换句话说，函数子组件的本质就是属性渲染。在上文中，我们借助 `render` 属性帮助我们渲染(是属性而不是React的render函数)，这么做虽然简单易懂，但是容易让人产生混淆和困惑，借助 `props.children` 这个神奇的属性，我们就可以少点顾虑的大展拳脚。

### `props.children`

那么神奇属性 `props.children` 和 `FaCC`(函数子组件)又有什么关系呢？看完下文你就明白了。

> 包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 `props.children` 传递给外层组件。有几种不同的方法来传递子元素：
> * 字符串字面量
> * JSX 子元素
> * `JavaScript` 表达式作为子元素
> * 函数作为子元素

具体形式我大致展示一下：

#### 字符串字面量:
``` jsx
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

看到这里是不是恍然大悟了。我们今天所要介绍的 `FaCC` 组件设计模式，就是基于最终一种 **函数作为子元素** 。在学习过HOC之后，知道高阶组件是对于原有组件的一种功能增强，亦可以说是对于某种业务逻辑的复用，那么现在HOC能够完成的功能，FaCC 基本也能够完成。跟HOC一样，FaCC也不是React API，准确的说是一种组件的设计模式。

``` jsx
const ClassNameWrapper = ({ children }) => children('demo-class')

// 使用
const HeadWithClass = (props) => (
  <ClassNameWrapper>
    {(class) => <header classNmae={class} ></header>}
  </ClassNameWrapper>
)
```

### 一个简单的关于钱的组件

让我们实现一个简单的例子，看看 FaCC 是如何发挥威力的。现在我们要写金额展示组件，并且要有增加删除的功能。这里我们用一个 amount 状态直接抽象成金额，货币的单位是美元。

``` jsx
const App = () => <Amount />;
class Amount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
  }
  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };
  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
      </div>
    );
  }
}
```

### 增加货币种类

接下来我们需要增加一个功能，要在页面展示其他货币类型的金额，并且要把汇率考虑进去。最简单的形式，有的同学可能直接在代码中这么写：

``` jsx
render() {
  return (
    <div>
      <span>US Dollar: {this.state.amount} </span>
      <button type="button" onClick={this.onIncrement}>
        +
      </button>
      <button type="button" onClick={this.onDecrement}>
        -
      </button>
      <p>Euro: {this.state.amount * 0.86}</p>
      <p>Pound: {this.state.amount * 0.76}</p>
    </div>
  );
}
```

这样写看似简洁正确，但是违背了我们对于组件细粒度拆分的原则，更好的拆分组件有利于后面更好的重构，接下来我们进行组件拆分：

``` jsx
const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;
const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;

class Amount extends Component {
  ...
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        <Euro amount={this.state.amount} />
        <Pound amount={this.state.amount} />
      </div>
    );
  }
}
```

让我们先分析上面的代码有些什么问题。首先这么写完全没有问题，优点十分明显：实现简单，理解简单。

但是我们忽略了一些事情：上述的写法将货币组件与金额组件的渲染紧紧关联在了一起，这意味这在修改渲染结果的时候就要修改金额组件的 render() 函数。这个是实现更好组件设计显而易见的缺陷。例如：当我们要对组件进行扩展，引入更多不同汇率的不同货币类型，我们就不得不对 render() 函数进行改造。而这是我们不愿意看到。

### 组合组件与提升状态

我们更希望金额和货币是松耦合的关系，这样能够更容易扩展，更容易将金额属性复用。为了解耦，使货币组件和提供数据的金额组件解耦，我们作出如下改造：

``` jsx
const App = () => (
  <div>
    <Amount />
    <Euro amount={amount} />
    <Pound amount={amount} />
  </div>
);
```

相比较简单把货币组件当作是金额组件子组件的方式，我们采取了组合组件(composition component)的方式。但是 amount 属性并没有接收到，所以我们接着改造：

``` jsx
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
  }
  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };
  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };
  render() {
    return (
      <div>
        <Amount
          amount={this.state.amount}
          onIncrement={this.onIncrement}
          onDecrement={this.onDecrement}
        />
        <Euro amount={this.state.amount} />
        <Pound amount={this.state.amount} />
      </div>
    );
  }
}
const Amount = ({ amount, onIncrement, onDecrement }) => (
  <div>
    <span>US Dollar: {amount} </span>
    <button type="button" onClick={onIncrement}>
      +
    </button>
    <button type="button" onClick={onDecrement}>
      -
    </button>
  </div>
);
```

这一步叫做**状态提升(lifting state)**，我们对于状态和行为进行了提升，放在了父组件中，这样做虽然解决了状态和行为共享的问题，但是却违背了我们当初把金额封装到 Amount 组件里面这个初衷，这样做显示不是我们想要的，还要继续对代码进行改造：

``` jsx
class Amount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
  }
  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };
  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.children}
      </div>
    );
  }
}

const App = () => (
  <Amount>
    <Pound amount={amount} />
    <Euro amount={amount} />
  </Amount>
);
```

这一步我们终于运用到了我们的神奇属性 props.children ，利用这个神奇属性，我们成功的将状态和行为封装在金额组件内部，同时解决金额组件和货币组件解耦的问题，金额组件中的 {this.props.children} 成功的将渲染货币组件的权利交了出去。

### FaCC完全形态

到了这一步，细心的小伙伴已经发现了这其实就是 props render 模式，同时我们体会到 props render 是对简单的 component composition 模式的增强。但是等等，我们状态 amount 还没有能够被复用。到了这一步，函数子组件终于揭开神秘面纱，我们用包裹了组件的函数作为 props children 传递给金额组件，而不是将货币组件红果果的送给金额组件，那么接下里传递 amount 属性给金额组件就变得很简单：

``` jsx
const App = () => (
  <Amount>
    {amount => (
      <div>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  </Amount>
);
class Amount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
  }
  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };
  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.children(this.state.amount)}
      </div>
    );
  }
}
```

到这里我们就算实现了一个经典的 函数子组件 设计模式了。上述代码没有立即将货币组件直接交给金额组件渲染，取而代之的是将组件作为函数传递给金额组件，这样就解决了一个关键性问题：属性传递。我们利用函数参数成功传递了 amount 状态。到这里我们算是完成 函数子组件 式改造了，该模式的优越性也体现了出来，当我们对于渲染内容进行修改时，我们不必要深入到金额组件修改 render() 函数了。

``` jsx
const App = () => (
  <Amount>
    {amount => (
      <div>
        <h1>My Currency Converter</h1>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  </Amount>
);
```

文章前面曾经提到过 函数子组件 本质上就是属性渲染(props render)：

``` jsx
const App = () => (
  <Amount
    render={amount => (
      <div>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  />
);
class Amount extends Component {
  ...
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.render(this.state.amount)}
      </div>
    );
  }
}
```

### FaCC 和 Slot

使用是 VUE 的同学肯定知道 slot 插槽这个东西，在React其实也有，将 props render 与 slot 结合在一起。插槽的作用是内容分发，将要渲染的内容分发在父组件相应的位置。

``` jsx
const App = () => (
  <Amount
    renderAmountOne={amount => (
      <div>
        <h2>My one Amount</h2>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
    renderAmountTwo={amount => (
      <div>
        <h2>My other Amount</h2>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  />
);
class Amount extends Component {
  ...
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        {this.props.renderAmountTwo(this.state.amount)}
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.renderAmountOne(this.state.amount)}
      </div>
    );
  }
}
```

### FaCC to HOC

``` jsx
const withAmount = currencyComponents =>
  class Amount extends Component {
    constructor(props) {
      super(props);
      this.state = {
        amount: 0,
      };
    }
    onIncrement = () => {
      this.setState(state => ({ amount: state.amount + 1 }));
    };
    onDecrement = () => {
      this.setState(state => ({ amount: state.amount - 1 }));
    };
    render() {
      return (
        <div>
          <span>US Dollar: {this.state.amount} </span>
          <button type="button" onClick={this.onIncrement}>
            +
          </button>
          <button type="button" onClick={this.onDecrement}>
            -
          </button>
          {currencyComponents.map(CurrencyComponent => (
            <CurrencyComponent amount={this.state.amount} />
          ))}
        </div>
      );
    }
  };
```

``` jsx
const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;
const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;
const CurrenciesWithAmount = withAmount([Euro, Pound]);

const App = () => <CurrenciesWithAmount />;
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
[6]: https://segmentfault.com/a/1190000016269347
[7]: https://juejin.im/entry/5a151f4b518825296421555e
[8]: https://blog.csdn.net/shendl/article/details/526362
[9]: https://my.oschina.net/u/2378713/blog/670056
[10]: http://www.uml.org.cn/mxdx/mxdx15.htm
[11]: https://keelii.com/2019/07/06/i-want-my-aop-cn/
[12]: https://reactjs.org/docs/jsx-in-depth.html#functions-as-children


* [深入理解 React 高阶组件（Higher Order Component，简称：HOC）](https://www.html.cn/archives/9462) —— 高阶组件讲解很全面
* [React组件间逻辑复用](http://www.ayqy.net/blog/react%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%BB%E8%BE%91%E5%A4%8D%E7%94%A8/)
* [React Render Props](https://www.robinwieruch.de/react-render-props) —— 属性渲染讲解的很详细
* [Render Props](https://zh-hans.reactjs.org/docs/render-props.html) —— 官方对于属性渲染的讲解
* [高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html) —— 官方对于高阶组件的讲解
* [Functional Mixins](https://medium.com/javascript-scene/functional-mixins-composing-software-ffb66d5e731c)
* [JavaScript 中的 Mixin 模式](https://zh.javascript.info/mixins)
* [Stanko/react-ratio](https://github.com/Stanko/react-ratio)
* [函数作为子组件(Function as Child Components)](https://www.html.cn/archives/9471)
* [React Render Props in TypeScript](https://medium.com/@jrwebdev/react-render-props-in-typescript-b561b00bc67c)
* [React Hooks in TypeScript](https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d)
* [React组件Render Props VS HOC 设计模式](https://www.jianshu.com/p/ff6b3008820a)
* [[译] 使用 Render props 吧！](https://juejin.im/post/5a3087746fb9a0450c4963a5)
* [How to pass props to components in React](https://www.robinwieruch.de/react-pass-props-to-component)
* [如何向带有插槽的 React 组件传递多个 Children](https://juejin.im/post/5b72935a6fb9a009724b3e4e)
* [React Higher Order Components in depth](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)