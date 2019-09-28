# React 声明周期详解

1. Constructor(props)

使用场景：初始化局部 State 或把方法的句柄绑定到实例  
注意：第一个语句必须是 super（props）

2. GetDerivedStateFromProps(props,state)

使用场景：内部 state 变化依赖于 props 时。  
注意：不要过度使用该函数。

* 如果你的操作依赖于 props 的更改并有副作用，最好放到 ComponentDidUpdate 中；
* 如果需要根据 props 的改变更新某些数据，最好使用 memoization 或 Reselect 做缓存处理；
* 如果你想根据 props 的改变重置 state 的值，使用全受控组件或带 key 的非受控组件。

3. ComponentWillMount - Legacy

使用场景：遗留函数，在 16.3 以后不应该再使用。  
注意：由于该函数在 render 之前调用，因此使用同步的 setstate 方法不会触发额外的 render 处理。

尽量使用 constructor 函数实现同样效果，如果是处理带有后续操作或有副作用或订阅事件的处理，放到 ComponentDidMount 中。

4. componentWillReceiveProps(nextProps) - Legacy

使用场景：遗留函数，在 16.3 以后不应该再使用。

组件将要接收新的 props 时被调用

当 props 改变需要相应改变内部 state 时使用该函数。

注意：如果父组件强制子组件更新，即使 props 没有改变也会调用该函数

总是比较 this.props 和 nextProps 来确认是否需要调用 setState。

5. shouldComponentUpdate(nextProps, nextState)

使用场景：性能优化接口

通过比较 this.props 与 nextProps， 和比较 this.state 与 nextState 来返回 false 阻止组件 render

注意：forceUpdate 不会触发该函数

某些情况可以使用 React.PureComponent 替代写该函数，参考 Here

返回 false 并不会阻止子组件的重新 render(如果他们的 state 改变的时候)

6. ComponentWillUpdate(nextProps, nextState) - Legacy
   　　　　　　使用场景：遗留函数，在 16.3 以后不应该再使用。

注意：不能在该函数中通过 this.setstate 再次改变 state，如果需要，则在 componentWillReceiveProps 函数中改变

7. Render
   　　　　　使用场景：核心函数，必不可少。返回类型包括：react 元素/数组或代码片段/入口/字符串或数字/bool 或空。

注意：不能在 render 函数中调用 setState。

在存活周期中，如果 shouldUpdateComponent 返回 false，该方法不会被调用。

8. getSnapshotBeforeUpdate(prevProps, prevState)
   　　　　　使用场景：该函数在最终 render 结果提交到 DOM 之前被调用

记录 DOM 刷新前的特性，如：滚动位置

注意：该函数的返回值会作为参数传递给 ComponentDidUpdate

9. ComponentDidMount
   　　　　　使用场景：真是 DOM 被更新之后调用

在创建组件周期，该函数是异步请求的最佳接口，用以加载数据，AJAX/Fetch/redux-dispatch

注意：这里也是产生性能问题最多的地方(因代码问题)

10. ComponentDidUpdate(prevProps, prevState, snapshot)
    　　　　　使用场景：通过比较 prevProps 或 prevState 与 this.props 或 this.state，进行业务处理，发送网络请求

注意：在处理业务或发送网络请求时，一定要做条件比较，否则容易造成死循环

11. ComponentWillUnmount
    　　　　　使用场景：组件销毁时调用

清理无效 timer；取消未完成的网络请求；清理已注册的订阅

注意：在这里 setState 是无效的

使用场景：任何子组件的 JS 错误或异常发生时触发

初始化周期和运行时周期的错误都会触发该函数

注意：只捕获该组件的所有子组件异常，并不会捕获本身的异常

在该函数中调用 setState 以实现错误回滚至前一页面

不要使用该函数作为业务处理的一部分。
