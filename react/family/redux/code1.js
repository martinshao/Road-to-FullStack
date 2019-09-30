// Top-Level Exports
  createStore(reducer, [preloadedState], [enhancer])
  combineReducers(reducers)
  applyMiddleware(...middlewares)
  bindActionCreators(actionCreators, dispatch)
  compose(...functions)
// Store API
  getState()
  dispatch(action)
  subscribe(listener)
  replaceReducer(nextReducer)