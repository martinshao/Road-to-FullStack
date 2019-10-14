
app.model({
    namespace: 'xxx',
    state: { /** */ },
    effects: { /** */ },
    reducers: { /** */ },
    subscriptions: { /** */ },
})

connect(mapStateToProps)(App);

dispatch({
    type: 'click-submit-button',
    payload: this.form.data
})

import { connect } from 'dva';

function mapStateToProps(state) {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);
