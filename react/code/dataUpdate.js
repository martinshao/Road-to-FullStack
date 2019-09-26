import PropTypes from 'prop-types';
import React, { Component } from 'react';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    // this.setState({})
  }

  shouldComponentUpdate(nextProps, nextState) {
    // return true
  }

  componentWillUpdate(nextProps, nextState) {
    // ...
  }

  componentDidUpdate(prevProps, prevState) {
    // ...
  }

  render() {
    return <div>This is a demo.</div>
  }
}

export default App;