# React组件性能优化——PureComponent

![](../assets/purecomponent.png)

> 从组件的角度谈性能优化的时候，我认为需要把握住的一个核心就是：避免冗余的渲染。
> 展开来说，JavaScript每段代码的执行，都是需要消耗计算的，react 上减少组件的渲染次数，也就是减少JavaScript的执行，直指性能优化的目的。

这是React组件性能优化的第一篇，会有一些铺垫内容，请小伙伴们内心阅读。

一般涉及到组件的性能优化，都会从渲染的角度的来说。为什么是从渲染的角度出发？我们知道在React的世界里，component从状态变化到实际dom的渲染是会先经过render，之后依据render的结果产生virtual DOM，最后再将virtual DOM和真正的DOM进行比较，把有修改的部分更新到真正的DOM上。而在这个过程中，涉及到JavaScript的部分（包括component 生命周期函数的运行，DOM diff算法的执行）都是很快的，根据我们以往的经验与实践中，我们都知道影响网页性能最大的因素是浏览器的重绘（reflow）和重排版（repaint）。React背后的Virtual Dom就是尽可能地减少浏览器的重绘和重排版，追根溯源，把握render执行的时机就是我们优化渲染性能的关键。

谷歌浏览器渲染页面流程  
![](../assets/chrome-rendering-process-eg.png)

所以综合React有这样几个特性，视图层框架、基于状态属性管理视图、单向数据流等。React如何对视图进行管理，答案是状态，管理好状态及其变化就管理好了视图。总的概括起来可以用下面的公式：

![](../assets/20191007211702.png)

对于性能优化这个主题，我们往往会基于“不信任”的前提，即我们需要提高 React Virtual Dom 的效率。从 React 的渲染过程来看，如何防止不必要的渲染可能是最需要去解决的问题。

React决定视图是否渲染包含两个方面，一个是对状态的管理，一个是基于变化状态属性是否执行渲染。

* 通过调用 this.setState 改变 state 驱动视图。
* 通过调用 this.forceUpdate 强制更新视图。
* 通过操作原生 dom 更新视图。
* 通过改变 props 驱动视图（redux 或者 修改父子组件传递 props ）。

从之前组件生命周期过来的同学都知道 shouldComponentUpdate() 这个方法可以控制是否执行render方法，官网给的定义是：

> shouldComponentUpdate() is invoked before rendering when new props or state are being received.

在之前的文章中，我们也探究过这段话的含义：shouldComponentUpdate()只有在props或state更新的时候才会被调用（应该说是必会执行，并且要返回一个boolean值），通过该方法返回的boolean值判断render是否执行，从而控制是否重新渲染组件。

这里有一个小陷阱，就是关于 shouldComponentUpdate() 执行时机，我将通过以下代码反馈：

``` js
class ParentRc extends Component {

  state = {
    count: 10,
    array: [1, 2, 3],
    dark: false
  }

  handleCountChange = () => {
    const count = this.state.count + 1
    const array = [...this.state.array, count]
    this.setState({
      count, array
    })
  }

  render() {
    const { count, array, dark } = this.state
    const theme = {
      backgroundColor: dark ? '#333' : '#FFF',
      color: dark ? '#FFF' : '#333'
    }
    console.info('Pure component', count, array)
    return (
      <div style={theme}>
        <button onClick={() => this.setState(({ dark: preDark }) => ({ dark: !preDark }))}>Toggle theme</button>
        <button onClick={this.handleCountChange}>Add Count</button>
        <ChildrenRc value={array} />
      </div>
    )
  }
}

class ChildrenRc extends Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  shouldComponentUpdate(nextProps) {
    console.info('ChildrenRc...shouldComponentUpdate')
  }

  render() {
    return this.props.value.map(num => <div key={num}>{num}</div>)
  }
}
```

通过修改 theme 状态，并且控制台打印出 ChildrenRc...shouldComponentUpdate 日志，我们彻底清楚了 shouldComponentUpdate() 执行时机，严格来说只要父组件状态被修改，触发了(re-render)，子组件的 shouldComponentUpdate() 就会执行，也正是通过这个生命周期，我们可以在父组件重新渲染时，子组件根据属性的实际情况选择是否渲染。

这也是 PureComponent 组件优化性能的基础。React15.3中新加了一个 PureComponent 类，顾名思义， pure 是纯的意思，PureComponent 也就是纯组件，取代其前身 PureRenderMixin ,PureComponent 是优化 React 应用程序最重要的方法之一，易于实施，只要把继承类从 Component 换成 PureComponent 即可，可以减少不必要的 render 操作的次数，从而提高性能，而且可以少写 shouldComponentUpdate 函数，节省了点代码。

但是 PureComponent 在为开发者提供便利的同时，也有其局限性：PureComponent通过prop和state的浅比较(shallow compare)来实现shouldComponentUpdate。因此 PureComponent 也只是在部分场景适合。

``` js
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
```

这样，性能渲染问题又转化成纯粹的 JavaScript 问题上面，关于 shallow compare 的概念，可以简单的总结为两点：

1. 采用严格相等：等于基本类型(number, string, boolean, null, undefined, symbol)，值必须完全相等，对于引用类型(object, array, function)，必须指向同一个reference。
2. 只比到第一层：这也是shallow的含义，等一层值要严格相等，且属性名称、数目必须一样。（具体可以参考浅拷贝、深拷贝）

按照这样的定义，我们就找到了 PureComponent 的局限性。

* 值不一样，但因为 reference 一样，所以 shallow compare 的结果是相等的，也就不render。
* 值一样，但因为 reference 不同，所以shallow compare 的结果不同，就会render了

PureComponent 异常使用场景

* props 为空数组、空对象
``` js
<List data={data || []} />
<List data={data || {}} />
```

这样的代码是为了给 `null/undefined` 的 `props` 初始化一个默认值，虽然不会报错，但是但props每次都是 `null/undefined` 时，组件仍旧 `re-render` ，原因是 `[] !== []`，他们的 `reference` 不相同。
解决办法是：使用 `defaultProps` 來初始化空值 `props`


* props 为 inline function
``` js
<CustomList 
  clickHandler={
    () => this.setState({number: this.state.number + 1}) 
  } 
/>
```
依旧是引用变量引起的问题，每次 clickHandler 都会传入一个新的 function，又因为 reference 不用每次都会 re-render，这种问题在之前说到的 render props 的组件设计模式中经常看到：
``` js
<CustomList 
  render={
    style => (
      <List style={style} />
  )}
/>
```

解决的办法是：不要使用 inline function，将function预先定义，如下：
```js
renderList (style) {
  return <List style={style} />
}
render () {
  return (
    <CustomList render={this.renderList} />
  )
}
```

* props.children 的值总是变动
``` js
<CustomList>
  <Item />
</CustomList>
// 同下
<CustomList children={<Item />} />
```

这种有props render 衍生出的组件模式，同样会出现如上的问题。原因也是 `<Item /> !== <Item />`，导致 re-render 的发生。

解决办法：这个问题由于组价设计模式导致的硬伤，遇到这种写法，PureComponent没有太大意义，直接使用React.Component比较好，还能节省部分 shallow compare 带来的性能损失。

PureComponent 错误使用场景

以上是PureComponent使用不当造成的问题，下面是一个错误使用场景：
```
class ListDisplay extends React.Component {
  render {
    const style = {color: 'red'}
    return <CustomList style={style} />
  }
}
```

上面代码在 ListDisplay 每次 render 的时候，都会重新创建一个 style 变量，这样 `<CustomList style={style} />` 组件也会跟着 re-render ，这种情况比使用component还要有问题，因为PureComponent都要执行一次 shallow compare ，无形中带来了计算开销。

PureComponent使用总结：

1. 注意前面说的需要注意的几点，避免出现上面的状况；
2. 要注意传入的props和state，只有真正遇到需要比较props和state带来性能优化，才选择PureComponent；
3. 可以使用 Immutable.js  处理相关的props或state，避免出现变动却没有 re-render 的情况发生；
4. 对于不常更新的Component，可以尝试抽离出PureComponent

## 参考资料

* [使用React.memo()来优化函数组件的性能][1]
* [CSS Animation性能优化][2]
* [重排重绘，看这一篇就够了][3]
* [聊一聊 React 中更新 ui 视图的几种方式][5]
* [重排与重绘][4]
* [React PureComponent 使用指南][5]

[1]: https://juejin.im/post/5c8edf626fb9a0710d65c7fc
[2]: https://github.com/amfe/article/issues/47
[3]: https://juejin.im/entry/582f16fca22b9d006b7afd89
[5]: https://juejin.im/post/5bb9c932f265da0aca332226
[4]: https://imweb.io/topic/5c2206a7611a25cc7bf1d848
[5]: https://juejin.im/entry/5934c9bc570c35005b556e1a
