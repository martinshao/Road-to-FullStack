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

let spec = [
  {
    "moduleId": 152,
    "specifications": [
      "P100",
      "T4"
    ]
  }
]

const fromPairs = pairs => pairs.reduce(
  (res, pair) => (
    (res[pair['region']] = pair['link']), res), {}
)

fromPairs(links)

const objLikeArr = [["name", "Jim"], ["age", 18], ["single", true]];

var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

const fromPairs = pairs =>
  pairs.reduce(
    (res, pair) => (
      (res[pair[0]] = pair[1]), res
    ), {}
  )

fromPairs(objLikeArr);

const specFromPairs = pairs => pairs.reduce(
  function (res, pair) {
    return (res[pair['moduleId']] = pair['specifications'], res)
  }, {}
)

const specFromPairs = pairs =>
  pairs.reduce(
    (res, pair) => (
      (res[pair['moduleId']] = pair['specifications']), res
    ), {}
  )

const a = specFromPairs(spec)

const lineData = {
  '1970-01-19': { successRate: 0, deployCount: 0, avgDeployTime: 0 }
}

const keys = Object.keys(lineData)
const dataSource = []
const a = keys.reduce(
  (res, item) => {
    const obj = {
      days: item,
      ...lineData[item]
    }
    return res.push(obj)
  },
  dataSource
)

function objToArray(lineData) {
  const keys = Object.keys(lineData)
  const dataSource = []
  keys.reduce(
    (res, item) => {
      const {
        successRate,
        deployCount,
        avgDeployTime,
      } = lineData[item]
      res.push({
        day: item,
        成功率: scaleHundred(successRate),
        次数: deployCount,
        平均耗时: millisecondToSecond(avgDeployTime),
      })
      return res
    },
    dataSource
  )
  return dataSource
}

const encode = (value) => {
  return window.btoa(window.encodeURIComponent(value))
}

const decode = (value) => {
  return window.decodeURIComponent(window.atob(value))
}

const encodeUrlParams = (objParams) => {
  let encodeStr = ''
  if (objParams) {
    let queryArr = []
    for (const key in objParams) {
      if (objParams[key]) {
        queryArr.push(`${key}=${objParams[key]}`)
      }
    }
    const paramsStr = queryArr.join('&')
    encodeStr = `spm=${encode(paramsStr)}`
  }
  return encodeStr
}

const decodeUrlParams = (url) => {
  const obj = urlQryToObj(url)
  const decodeStr = obj.spm
  const decodeData = decode(decodeStr)
  const params = decodeData.split('&')
  const obj = {}
  params.map(item => {
    const kv = item.split('=')
    obj[kv[0]] = kv[1]
    return kv
  })
  return obj
}


const urlQryToObj = (url) => {
  const query = url.split('?')[1]
  const params = query.split('&')
  const obj = {}
  params.map(item => {
    const kv = item.split('=')
    obj[kv[0]] = kv[1]
    return kv
  })
  return obj
}