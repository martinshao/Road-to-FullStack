import React, { Component } from "react";
import { Button } from "@ali/wind";
import Table from '@ali/wind-rc-table'

const render = (value, index, record) => {
  return <a href="javascript:;">Remove({record.id})</a>;
}

const columns = [
  {
    key: 'name',
    title: 'POD Name',
    dataIndex: 'name',
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
  },
  {
    key: 'ip',
    title: 'POD IP',
    dataIndex: 'ip',
  },
  {
    key: 'nodeIp',
    title: 'Node IP',
    dataIndex: 'nodeIp',
  },
  {
    key: 'operator',
    title: '操作',
    dataIndex: 'id',
  },
]

class Demo1 extends React.Component {

  state = {
    dataSource: []
  }

  dataSource = () => {
    const result = [{
      "id": 4,
      "name": "dhbcn",
      "namespace": "shao-party-1-prod",
      "algoGroup": "shao-party-1",
      "algoName": "shao-serv-1",
      "version": "2020-01-02-10-27-49",
      "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-dhbcn",
      "status": "RUNNING",
      "error": null,
      "ip": "192.168.44.122",
      "nodeIp": "192.168.36.196",
      "restartCount": 0
    },
    {
      "id": 4,
      "name": "fch7g",
      "namespace": "shao-party-1-prod",
      "algoGroup": "shao-party-1",
      "algoName": "shao-serv-1",
      "version": "2020-01-02-10-27-49",
      "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-fch7g",
      "status": "RUNNING",
      "error": null,
      "ip": "192.168.44.169",
      "nodeIp": "192.168.36.196",
      "restartCount": 0
    },
    {
      "id": 4,
      "name": "jz6pc",
      "namespace": "shao-party-1-prod",
      "algoGroup": "shao-party-1",
      "algoName": "shao-serv-1",
      "version": "2020-01-02-10-27-49",
      "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-jz6pc",
      "status": "RUNNING",
      "error": null,
      "ip": "192.168.44.173",
      "nodeIp": "192.168.36.196",
      "restartCount": 0
    },
    {
      "id": 4,
      "name": "pwxbb",
      "namespace": "shao-party-1-prod",
      "algoGroup": "shao-party-1",
      "algoName": "shao-serv-1",
      "version": "2020-01-02-10-27-49",
      "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-pwxbb",
      "status": "RUNNING",
      "error": null,
      "ip": "192.168.44.181",
      "nodeIp": "192.168.36.196",
      "restartCount": 0
    }
    ];
    return result;
  };

  componentDidMount() {
    const dataSource = this.dataSource()
    this.setState({
      dataSource,
    })
  }

  addData = () => {
    const dataSource = [
      {
        "id": 6,
        "name": "dhbcn",
        "namespace": "shao-party-1-prod",
        "algoGroup": "shao-party-1",
        "algoName": "shao-serv-1",
        "version": "2020-01-02-10-27-49",
        "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-dhbcn",
        "status": "RUNNING",
        "error": null,
        "ip": "192.168.44.122",
        "nodeIp": "192.168.36.196",
        "restartCount": 0
      },
      {
        "id": 6,
        "name": "fch7g",
        "namespace": "shao-party-1-prod",
        "algoGroup": "shao-party-1",
        "algoName": "shao-serv-1",
        "version": "2020-01-02-10-27-49",
        "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-fch7g",
        "status": "RUNNING",
        "error": null,
        "ip": "192.168.44.169",
        "nodeIp": "192.168.36.196",
        "restartCount": 0
      },
      {
        "id": 6,
        "name": "hbmxj",
        "namespace": "shao-party-1-prod",
        "algoGroup": "shao-party-1",
        "algoName": "shao-serv-1",
        "version": "2020-01-02-10-27-49",
        "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-hbmxj",
        "status": "WAITING",
        "error": null,
        "ip": null,
        "nodeIp": "192.168.36.196",
        "restartCount": 0
      },
      {
        "id": 6,
        "name": "jz6pc",
        "namespace": "shao-party-1-prod",
        "algoGroup": "shao-party-1",
        "algoName": "shao-serv-1",
        "version": "2020-01-02-10-27-49",
        "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-jz6pc",
        "status": "RUNNING",
        "error": null,
        "ip": "192.168.44.173",
        "nodeIp": "192.168.36.196",
        "restartCount": 0
      },
      {
        "id": 6,
        "name": "pwxbb",
        "namespace": "shao-party-1-prod",
        "algoGroup": "shao-party-1",
        "algoName": "shao-serv-1",
        "version": "2020-01-02-10-27-49",
        "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-pwxbb",
        "status": "RUNNING",
        "error": null,
        "ip": "192.168.44.181",
        "nodeIp": "192.168.36.196",
        "restartCount": 0
      },
      {
        "id": 6,
        "name": "sz528",
        "namespace": "shao-party-1-prod",
        "algoGroup": "shao-party-1",
        "algoName": "shao-serv-1",
        "version": "2020-01-02-10-27-49",
        "podName": "shao-serv-1-2020-01-02-10-27-49-6678757b5b-sz528",
        "status": "WAITING",
        "error": null,
        "ip": null,
        "nodeIp": "192.168.36.196",
        "restartCount": 0
      }
    ];
    this.setState({
      dataSource,
    })
  }

  render() {
    const { dataSource } = this.state
    return (
      <React.Fragment>
        <Button onClick={this.addData}>添加数据</Button>
        <Table dataSource={dataSource} columns={columns} />
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Demo1 />, mountNode)