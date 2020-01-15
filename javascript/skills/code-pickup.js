
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

  // tips
  // 上面的代码有个小技巧，就是逗号操作符的使用
  (1, 2, 3) // return 3

/**
 *  转化对象
 * @param {string} key 对象key值
 * @param {string} value 对象value值
 * @param {object} pairs 需要转化的对象
 * @version
 */
function fromPairs(key, value, pairs) {
  return pairs.reduce(
    function (res, pair) {
      res[pair[key]] = pair[value]
      return res
    }, {}
  )
}

const fromPairs = (key, value, pairs) =>
  pairs.reduce(
    (res, pair) => (
      (res[pair[key]] = pair[value]), res
    ), {}
  )

const fromPairs = (key, value, pairs) =>
  pairs.reduce(
    (res, pair) => {
      res[pair[key]] = pair[value]
      return res
    }, {}
  )

const fromPairs = pairs => pairs.reduce(
  (res, pair) => (
    (res[pair['region']] = pair['link']), res), {}
)

let links = [
  {
    "link": "shanghai-link",
    "region": "shanghai"
  },
  {
    "link": "beijing-link",
    "region": "beijing"
  },
  {
    "link": "hangzhou-link",
    "region": "hangzhou"
  },
  {
    "link": "guangzhou-link",
    "region": "guangzhou"
  },
]

const array = fromPairs('region', 'link', links)