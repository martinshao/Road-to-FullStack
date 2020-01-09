import React, { Component } from "react";
import { Table, Button } from "@ali/wind";

const dataSource = () => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push({
      title: {
        name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`
      },
      id: 100306660941,
      time: 2000 + i
    });
  }
  return result;
};

const render = (value, index, record) => {
  return <a href="javascript:;">Remove({record.id})</a>;
};

class Demo1 extends React.Component {

  state = {
    dataSource: []
  }

  componentDidMount() {
    const dataSource = dataSource()
    this.setState({
      dataSource,
    })
  }

  addData = () => {
    const { dataSource } = this.state
    const newData = {
      title: {
        name: `Quotation for 1PCS Nano ${3 + 12}.0 controller compatible`
      },
      id: 100306660941,
      time: 2000 + i
    }
    dataSource.push(newData)
    this.setState({
      dataSource,
    })
  }

  render() {
    const { dataSource } = this.state
    return (
      <React.Fragment>
        <Button onClick={this.addData}>添加数据</Button>
        <Table dataSource={dataSource()}>
          <Table.Column title="Id" dataIndex="id" />
          <Table.Column title="Title" dataIndex="title.name" />
          <Table.Column title="Time" dataIndex="time" />
          <Table.Column cell={render} />
        </Table>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode)