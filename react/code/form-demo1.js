import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    const { inputValue } = this.state;

    return (
      <div>
        <input
          type='text'
          value={inputValue}
          onChange={this.handleInputChange}
        />
        <p>输入内容： {inputValue}</p>
      </div>
    );
  }
}
