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

  propTypes: {
    color: React.PropTypes.string,
    text: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      color: 'blue',
      text: 'Confirm'
    };
  },

  getInitialState() {
    return {
      loading: this.props.initialValue || true
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

  propTypes: {
    color: React.PropTypes.string,
    text: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      color: 'blue',
      text: 'Confirm'
    };
  },

  getInitialState() {
    return {
      placeholder: this.props.initialValue || ''
    };
  },
  render() {
    const { placeholder } = this.state;
    const { color, text } = this.props;

    return (
      <div>
        <input type="text" placeholder={placeholder} />
        <button className={`btn btn-${color}`}>
          <em>{text}</em>
        </button>
      </div>
    )
  }
})

export default MyComponent

// 15.4 以前
import React from 'react';

class Component extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

Component.propTypes = {
  text: React.PropTypes.string.isRequired,
}

// 15.5 以后
import React from 'react';
import PropTypes from 'prop-types';

class Component extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

Component.propTypes = {
  text: PropTypes.string.isRequired,
};

// 15.4 以前
var React = require('react');

var Component = React.createClass({
  mixins: [MixinA],
  render() {
    return <Child />;
  }
});

// 15.5 以后
var React = require('react');
var createReactClass = require('create-react-class');

var Component = createReactClass({
  mixins: [MixinA],
  render() {
    return <Child />;
  }
});