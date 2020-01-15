
/**
 * 将对象转化为数组
 * @method objToArray
 * @param {string} key 数组对象的key
 * @param {object} value 要转换的对象
 * @return {array} 数组对象
 * @version v3.0
 */
function objToArray(key, value) {
  const keys = Object.keys(value)
  const dataSource = []
  keys.reduce(
    (res, item) => (
      res.push({
        [key]: item,
        ...value[item]
      }), res
    ),
    dataSource
  )
  return dataSource
}

// v1.0
function objToArray(key, value) {
  const keys = Object.keys(value)
  const dataSource = []
  keys.reduce(
    (res, item) => {
      res.push({
        [key]: item,
        ...value[item]
      })
      return res
    },
    dataSource
  )
  return dataSource
}

// v2.0
function objToArray(key, value) {
  const keys = Object.keys(value)
  const dataSource = []
  keys.reduce(
    (res, item) => {
      return res.push({
        [key]: item,
        ...value[item]
      }), res
    },
    dataSource
  )
  return dataSource
}

// test
const lineData = {
  "2020-01-01": {
    "successRate": 0,
    "deployCount": 0,
    "avgDeployTime": 0
  },
  "2020-01-02": {
    "successRate": 0,
    "deployCount": 0,
    "avgDeployTime": 0
  },
}

const dataSource = objToArray('days', lineData)
const dataSource1 = objToArray('days', {})