# React 从入门到精通

## React系列总结文章大纲

* 认识React ，已经React全家桶成员，还有很多衍生框架
* React生命周期的变更，以及变更的原因
* React组件的介绍，各种组件的应用
* React类组件需要特殊注意事项
* React类组件和生命周期
* React函数组件和Hooks
* React事件机制

## React全家桶好用的插件

* `prop-types`: 类型检查插件
* `classnames`: 样式处理插件
* `react-css-module`: 样式处理插件

## React组件类型分析

1. 函数组件和类组件
2. 无状态组件和有状态组件
3. 展示型组件和容器型组件

另外还有高阶组件的概念

React 组件有很多种分类方式，常见的分类方式有函数组件和类组件，无状态组件和有状态组件，展示型组件和容器型组件。好吧，这又是一篇咬文嚼字的文章。但是，真正把这几组概念咬清楚、嚼明白后，对于页面的组件划分、组件之间的解耦是大有裨益的。

函数组件和类组件
函数组件(Functional Component )和类组件(Class Component)，划分依据是根据组件的定义方式。函数组件使用函数定义组件，类组件使用ES6 class定义组件。下面是函数组件和类组件的简单示例：

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

无状态组件和有状态组件
无状态组件(Stateless Component )和有状态组件(Stateful Component)，划分依据是根据组件内部是否维护state。无状态组件内部不使用state，只根据外部组件传入的props返回待渲染的React 元素。有状态组件内部使用state，维护自身状态的变化，有状态组件根据外部组件传入的props和自身的state，共同决定最终返回的React 元素。

很容易知道，函数组件一定是无状态组件，类组件则既可以充当无状态组件，也可以充当有状态组件。但如上文所述，当一个组件不需要管理自身状态时，也就是无状态组件，应该优先设计为函数组件。

展示型组件和容器型组件
展示型组件(Presentational Component)和容器型组件(Container Component)，划分依据是根据组件的职责。

展示型组件的职责是：组件UI长成什么样。展示型组件不关心组件使用的数据是如何获取的，以及组件数据应该如何修改，它只需要知道有了这些数据后，组件UI是什么样子的即可。外部组件通过props传递给展示型组件所需的数据和修改这些数据的回调函数，展示型组件只是它们的使用者。展示型组件一般是无状态组件，不需要state，因为展示型组件不需要管理数据，但当展示型组件需要管理自身的UI状态时，例如控制组件内部弹框的显示与隐藏，是可以使用state的，这时的state属于UI state。既然大部分情况下展示型组件不需要state，应该优先考虑使用函数组件实现展示型组件。

容器型组件的职责是：组件数据如何工作。容器型组件需要知道如何获取子组件所需数据，以及这些数据的处理逻辑，并把数据和逻辑通过props提供给子组件使用。容器型组件一般是有状态组件，因为它们需要管理页面所需数据。

例如，下面的例子中，UserListContainer是一个容器型组件，它获取用户列表数据，然后把用户列表数据传递给展示型组件UserList，由UserList负责UI的展现。

``` js
class UserListContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    var that = this;
    fetch('/path/to/user-api').then(function(response) {
      response.json().then(function(data) {
        that.setState({users: data})
      });
    });
  }

  render() {
    return (
      <UserList users={this.state.users} />
    )
  }
}

function UserList(props) {
  return (
    <div>
      <ul className="user-list">
        {props.users.map(function(user) {
          return (
            <li key={user.id}>
              <span>{user.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  )
```

展示型组件和容器型组件是可以互相嵌套的，展示型组件的子组件既可以包含展示型组件，也可以包含容器型组件，容器型组件也是如此。例如，当一个容器型组件承担的数据管理工作过于复杂时，可以在它的子组件中定义新的容器型组件，由新组件分担数据的管理。展示型组件和容器型组件的划分完全取决于组件所做的事情。

总结
通过上面的介绍，可以发现这三组概念有很多重叠部分。这三组概念都体现了关注点分离的思想：UI展现和数据逻辑的分离。函数组件、无状态组件和展示型组件主要关注UI展现，类组件、有状态组件和容器型组件主要关注数据逻辑。但由于它们的划分依据不同，它们并非完全等价的概念。它们之间的关联关系可以归纳为：函数组件一定是无状态组件，展示型组件一般是无状态组件；类组件既可以是有状态组件，又可以是无状态组件，容器型组件一般是有状态组件。

## React 组件设计原则

### 参考资料

* [7 Architectural Attributes of a Reliable React Component](https://dmitripavlutin.com/7-architectural-attributes-of-a-reliable-react-component)
8 [可靠React组件设计的7个准则之SRP](https://juejin.im/post/5d4acb28e51d45620771f082)
