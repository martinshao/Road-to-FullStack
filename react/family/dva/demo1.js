
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
