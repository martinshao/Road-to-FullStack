// 改为这样（export 的不再是connect，而是class组件本身。），也是可以执行的，但要注意@connect必须放在export default class前面：
// 将 model 和 component 串联起来
@connect(({ user, login, global = {}, loading }) => ({
    currentUser: user.currentUser,
    collapsed: global.collapsed,
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices,
    menuData: login.menuData,         // by hzy
    redirectData: login.redirectData, // by hzy
  }))
  
  export default class BasicLayout extends React.PureComponent { 
     // ...
  }