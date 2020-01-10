import React from 'react'
import qs from 'qs'
import axios from 'axios'
import { Message, Dialog } from '@ali/wind'

const MOCK_URL = 'https://mocks.alibaba-inc.com/mock/viapi-admin-web-front'

const ERR_MODEL = {
  success: false,
  data: null,
  error: true,
  errorMessage: '系统异常',
}

const MOCK_API = [
  '/api/mock/efficdata',
  '/api/mock/apidatatable',
  '/api/mock/apidatatabletoken',
  '/api/integration/getDetail',
  '/api/integration/getEnv/mock', // 获取线上环境
  '/api/specification/module/query',
]

const isPutParam = (method, params, isJson) => {
  if (method === 'put' || isJson) {
    return params
  } else {
    return qs.stringify(params)
  }
}

const fetch = (method, path, params, customError = true, isJson = false) => {
  const url = MOCK_API.includes(path) ?
    `${MOCK_URL}${path}` : `${path}`

  const headers = {
    'Content-Type': method === 'put' || isJson ?
      'application/json;charset=UTF-8' :
      'application/x-www-form-urlencoded;charset=UTF-8',
  }

  console.info('url---', url, 'method---', method, 'customError', customError) // eslint-disable-line
  return axios({
    url,
    method,
    headers,
    data: method === 'post' || method === 'put' ?
      isPutParam(method, params, isJson) : null,
    params: method === 'get' || method === 'delete' ? params : null,
  })
    .then(res => {
      switch (res.status) {
        case 200:
          // 错误处理
          // PROMPT("PROMPT", "提示，弹出告警框，需要用户点击确定"),
          // WARNING("WARNING", "警告，用警告的toast展示"),
          // ERROR("ERROR", "错误，用错误的toast展示");
          if (res.data.errorCode === 'PROMPT' && customError) {
            Dialog.show({
              title: <span>温馨提示</span>,
              content: res.data.showMessage && '',
            })
          } else if (res.data.errorCode === 'WARNING' && customError) {
            Message.warning(res.data.showMessage);
          } else if (res.data.errorCode === 'ERROR' && customError) {
            Message.error(res.data.showMessage);
          }
          if (customError && res.data.errorMessage && !['PROMPT', 'WARNING', 'ERROR'].includes(res.data.errorCode)) {
            Message.warning(res.data.errorMessage);
          }
          if (res.data.success) {
            return res.data;
          }
          if (!res.data.data) {
            res.data.data = {}
            return res.data
          } else {
            return res.data
          }
        default:
          break;
      }
    })
    .catch((err) => {
      if (err) {
        const errStr = String(err)
        if (errStr.includes('Network Error')) {
          Message.error('请检查网络，网络端出错了哦')
          return ERR_MODEL
        } else if (errStr.includes('TypeError: Cannot read property')) {
          return ERR_MODEL
        } else {
          Message.error('服务端出错了哦')
          console.log(err)
          return ERR_MODEL
        }
      }
    })
}

const get = (path, params, customError) => (
  fetch('get', path, params, customError)
)
const put = (path, params, customError) => (
  fetch('put', path, params, customError)
)
const post = (path, params, customError) => (
  fetch('post', path, params, customError)
)
const jsonPost = (path, params, customError) => (
  fetch('post', path, params, customError, true)
)
const DELECT = (path, params, customError) => (
  fetch('delete', path, params, customError)
)

export {
  get,
  put,
  post,
  jsonPost,
  DELECT,
}
