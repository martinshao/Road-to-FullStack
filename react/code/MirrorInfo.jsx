import React, { Component } from 'react'
import './style.less'
// import List from './List'
import columnsConfig from './List/columns'
import { withProps } from 'recompose'
import { connect } from 'dva'
import Instruction from './Instruction'
import PropTypes from 'prop-types'
import Table from '@ali/wind-rc-table'
import { Input, Icon, Tab } from '@ali/wind'
import { actions, selectors } from 'Model/mirrorDetail'

const mapStateToProps = state => ({
  images: selectors.getDataSource(state),
  account: selectors.getAccount(state),
  page: selectors.getPage(state),
  query: selectors.getQueryWithRegionId(state),
  loading: actions.fetchAccount.isLoading(state),
  versionLoading: actions.fetchVersions.isLoading(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAccount(query = {}) {
    dispatch(actions.fetchAccount(query))
  },
  fetchVersions(query = {}) {
    dispatch(actions.fetchVersions(query))
  },
  onRefresh(query = {}) {
    dispatch(actions.updateQuery(query))
  },
  onPageChange(pageNumber) {
    const data = { currentPage: pageNumber }
    dispatch(actions.dump(data))
    dispatch(actions.updateQuery(data))
  },
  onPageSizeChange(pageSize) {
    dispatch(actions.updateQuery({
      pageSize,
      currentPage: 1,
    }))
  },
  resetRepoId(repoId) {
    dispatch(actions.updateQuery({
      repoId
    }))
  }
})

const withPagination = paginationProps => withProps((ownerProps) => {
  const { page, onPageChange, onPageSizeChange } = ownerProps
  console.info(page, paginationProps)
  if (page || paginationProps) {
    return {
      pagination: {
        ...paginationProps,
        ...page,
        onChange: onPageChange,
        onPageSizeChange,
      },
    }
  }
})

@connect(mapStateToProps, mapDispatchToProps)
@withPagination()
class MirrorInfo extends Component {
  static propTypes = {
    id: PropTypes.string,
    resetRepoId: PropTypes.func,
    fetchAccount: PropTypes.func,
    fetchVersions: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.object),
    account: PropTypes.object
  }

  state = {
    htmlType: 'password'
  }

  componentDidMount() {
    const { id, resetRepoId, fetchAccount, fetchVersions } = this.props
    fetchAccount()
    fetchVersions({ repoId: id })
    resetRepoId(id)
  }

  componentDidUpdate(prevProps) {
    const { fetchVersions, query } = this.props
    if (prevProps.query !== query) {
      fetchVersions(query)
    }
  }

  getPassword = () => {
    const { htmlType } = this.state
    if (htmlType === 'password') {
      this.setState({
        htmlType: 'text'
      })
    } else {
      this.setState({
        htmlType: 'password'
      })
    }
  }

  render() {
    const { htmlType } = this.state
    const { account, images } = this.props
    return (
      <React.Fragment>
        <div className="repo-account">
          <Input
            addonBefore="账户名："
            hasBorder={false}
            htmlType="text"
            value={account.subaccountName}
          />
          <Input
            innerAfter={
              <Icon
                type="eye"
                style={{ marginLeft: 4 }}
                onClick={this.getPassword}
              />
            }
            style={{ width: 230 }}
            addonBefore="账户密码："
            hasBorder={false}
            htmlType={htmlType}
            value={account.registryPassword}
          />
        </div>
        <Tab>
          <Tab.Item key="instructions" title="使用说明">
            <Instruction />
          </Tab.Item>
          <Tab.Item key="repo-his" title="镜像版本">
            <div className="repo-his">
              <Table
                loading={this.props.versionLoading}
                columns={columnsConfig}
                dataSource={images}
                pagination={this.props.pagination}
                search={this.props.search}
                operation={this.props.operation}
              />
            </div>
          </Tab.Item>
        </Tab>
      </React.Fragment>
    )
  }
}

export default MirrorInfo
