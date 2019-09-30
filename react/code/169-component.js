import React from 'react'

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // 初始化state方式（1）
    this.state = {

    }
  }

  static defaultProps = {

  }

  // 初始化state方式（2）
  state = {

  }
  static getDerivedStateFromProps(props, state) {
    return state
  }
  componentDidCatch(error, info) {

  }
  render() {

  }
  componentDidMount() {

  }
  shouldComponentUpdate(nextProps, nextState) {

  }
  getSnapshotBeforeUpdate(prevProps, prevState) {

  }
  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  componentWillUnmount() {

  }

}