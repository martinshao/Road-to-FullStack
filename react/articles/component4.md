# React组件设计技巧——展示型组件和容器型组件

展示组件和容器组件
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