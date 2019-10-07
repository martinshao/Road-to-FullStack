import PropTypes from 'prop-types';
import React, { Component } from 'react';

class App extends Component {

  static propTypes = {
    name: PropTypes.string
    // ...
  }

  static defaultProps = {
    // ...
  }

  constructor(props) {
    super(props);

    this.state = {
      // ...
    }
  }

  componentWillMount() {
    // ...
  }

  componentDidMount() {
    // ...
  }

  render() {
    return <div>This is a demo.</div>
  }
}

export default App;

class Button extends Componnet {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    color: 'color',
    text: 'Confirm'
  };

  render() {
    const { color, text } = this.props;
    
    <button className={`btn btn-${color}`}>
      <em>{text}</em>
    </button>
  }
}