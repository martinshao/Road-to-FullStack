const mapStateToProps = (state) => {
    return ({
        count: state.counter.count
    })
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increase: (...args) => dispatch(actions.increase(...args)),
        decrease: (...args) => dispatch(actions.decrease(...args))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(yourComponent)


export default connect(
    ({
        user,
        login,
        global = {},
        loading
    }) => ({
        login: login,
        currentUser: user.currentUser,
        collapsed: global.collapsed,
        fetchingNotices: loading.effects['global/fetchNotices'],
        notices: global.notices
    })
)(BasicLayout);

// 简化版
export default connect(
    ({
        user,
        login,
        global = {},
        loading
    }) => {
        return {
            currentUser: user.currentUser,
            collapsed: global.collapsed,
            fetchingNotices: loading.effects['global/fetchNotices'],
            notices: global.notices
        }
    }
)(BasicLayout);

connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])


import dva from 'dva';
const App = () => <div>Hello dva</div>;

// 创建应用
const app = dva();
// 注册视图
app.router(() => <App />);
// 启动应用
app.start('#root');