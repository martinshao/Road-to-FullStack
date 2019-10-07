var InputControlES5 = React.createClass({
  propTypes: {
    initialValue: React.PropTypes.string
  },
  defaultProps: {
    initialValue: ''
  },
  // 设置 initial state
  getInitialState: function () {
    return {
      text: this.props.initialValue || 'placeholder'
    };
  },
  handleChange: function (event) {
    this.setState({
      text: event.target.value
    });
  },
  render: function () {
    return (
      <div>
        Type something:
        <input onChange={this.handleChange} value={this.state.text} />
      </div>
    );
  }
});

const Button = React.createClass({
  getDefaultProps() {
    return {
      color: 'blue',
      text: 'Confirm'
    };
  },

  render() {
    const { color, text } = this.props;

    return (
      <button className={`btn btn-${color}`}>
        <em>{text}</em>
      </button>
    )
  }
})

import React from 'react'

const MyComponent = React.createClass({
  // 通过proTypes对象和getDefaultProps()方法来设置和获取props
  propTypes: {
    name: React.PropTypes.string
  },
  getDefaultProps() {
    return {

    }
  },
  // 通过getInitialState()方法返回一个包含初始值的对象
  getInitialState() {
    return {
      sayHello: 'Hello Srtian'
    }
  },
  render() {
    return (
      <p></p>
    )
  }
})

export default MyComponent