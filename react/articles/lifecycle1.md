各生命周期过程简要说明：

constructor()
React组件的构造函数将会在装配之前被调用。
static getDerivedStateFromProps()
组件实例化后和接受新属性时将会调用getDerivedStateFromProps。它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态。
调用this.setState() 通常不会触发 getDerivedStateFromProps()。
UNSAFE_componentWillMount()
UNSAFE_componentWillMount()在装配发生前被立刻调用。其在render()之前被调用，因此在这方法里同步地设置状态将不会触发重渲。
这是唯一的会在服务端渲染调起的生命周期钩子函数。
**注意：**这一生命周期之前叫做componentWillMount。这一名字在17版前都有效。
render()
render()函数应该纯净，意味着其不应该改变组件的状态，其每次调用都应返回相同的结果，同时不直接和浏览器交互。若需要和浏览器交互，将任务放在componentDidMount()阶段或其他的生命周期方法。保持render() 方法纯净使得组件更容易思考。
**注意：**若 shouldComponentUpdate() 返回false，render()函数将不会被调用。
componentDidMount()
componentDidMount()在组件被装配后立即调用。初始化使得DOM节点应该进行到这里。若你需要从远端加载数据，这是一个适合实现网络请求的地方。在该方法里设置状态将会触发重渲。
UNSAFE_componentWillReceiveProps()
UNSAFE_componentWillReceiveProps()在装配了的组件接收到新属性前调用。若你需要更新状态响应属性改变（例如，重置它），你可能需对比this.props和nextProps并在该方法中使用this.setState()处理状态改变。
**注意：**推荐你使用getDerivedStateFromProps生命周期而不是UNSAFE_componentWillReceiveProps。关于此建议在此了解详情。
shouldComponentUpdate()
当接收到新属性或状态时，shouldComponentUpdate() 在渲染前被调用。默认为true。该方法并不会在初始化渲染或当使用forceUpdate()时被调用。
UNSAFE_componentWillUpdate()
当接收到新属性或状态时，UNSAFE_componentWillUpdate()为在渲染前被立即调用。在更新发生前，使用该方法是一次准备机会。该方法不会在初始化渲染时调用。
getSnapshotBeforeUpdate()
getSnapshotBeforeUpdate()在最新的渲染输出提交给DOM前将会立即调用。它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会作为参数被传递给componentDidUpdate()。
componentDidUpdate()
componentDidUpdate()会在更新发生后立即被调用。该方法并不会在初始化渲染时调用。
当组件被更新时，使用该方法是操作DOM的一次机会。这也是一个适合发送请求的地方，要是你对比了当前属性和之前属性。
componentWillUnmount()
componentWillUnmount()在组件被卸载和销毁之前立刻调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在componentDidMount环节创建的DOM元素。
componentDidCatch()
错误边界是React组件，并不是损坏的组件树。错误边界捕捉发生在子组件树中任意地方的JavaScript错误，打印错误日志，并且显示回退的用户界面。错误边界捕捉渲染期间、在生命周期方法中和在它们之下整棵树的构造函数中的错误。
如果定义了这一生命周期方法，一个类组件将成为一个错误边界。在错误边界中调用setState()让你捕捉当前树之下未处理的JavaScript错误，并显示回退的用户界面。只使用错误边界来恢复异常，而不要尝试将它们用于控制流。

## 参考资料

* [正确掌握 React 生命周期 (Lifecycle)][1]
* [React v16.3 版本新生命周期函数浅析及升级方案][2]
* [[译] React v16.9.0 and the Roadmap Update][3]
* [理解React组件的生命周期][4]

[1]: https://juejin.im/entry/587de1b32f301e0057a28897
[2]: https://juejin.im/post/5ae6cd96f265da0b9c106931
[3]: https://juejin.im/post/5d527bbb51882515374dd15a
[4]: https://segmentfault.com/a/1190000013354181
