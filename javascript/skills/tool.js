import URL from 'url'

const isEnStr = (str) => {
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if ((c <= 0x007e && c >= 0x0001) || (c >= 0xff60 && c <= 0xff9f)) {
      continue
    } else {
      return false
    }
  }
  return true
}
const delayTask = (delay = 300) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}
const countCharacters = (str) => {
  let totalCount = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if ((c >= 0xff60 && c <= 0xff9f) || (c <= 0x007e && c >= 0x0001)) {
      totalCount += 1;
    } else {
      totalCount += 2;
    }
  }
  return totalCount;
}

const getQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

const formatFileSize = (fileSize) => {
  if (fileSize < 1024) {
    return fileSize + 'B'
  } else if (fileSize < (1024 * 1024)) {
    let temp = fileSize / 1024;
    temp = temp.toFixed(2)
    return temp + 'KB'
  } else if (fileSize < (1024 * 1024 * 1024)) {
    let temp = fileSize / (1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'MB'
  } else {
    let temp = fileSize / (1024 * 1024 * 1024);
    temp = temp.toFixed(2)
    return temp + 'GB'
  }
}

const isJson = (str) => {
  if (!str) {
    return false
  }
  try {
    const jsonObj = JSON.parse(str)
    if (typeof jsonObj === 'object' && jsonObj) {
      return true
    }
  } catch (e) {
    console.log('isJson-->' + str + '!!!')
    return false
  }
}

const encodeSearchParams = (obj) => {
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value === 'undefined') {
      value = ''
    }
    params.push([key, encodeURIComponent(value)].join('='))
  })

  return params.join('&')
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

const setUrlWithObj = (param, empotyReplactStr = 'all') => {
  const {
    query,
    pathname,
  } = URL.parse(window.location.href, true, true)
  const targetQuery = {
    ...query,
    ...param,
  }
  console.log(targetQuery, URL.parse(window.location.href, true, true))
  let targetUrlStr = pathname
  Object.keys(targetQuery).forEach((key, ind) => {
    if (ind) {
      targetUrlStr += `&${key}=${targetQuery[key] || empotyReplactStr}`
    } else {
      targetUrlStr += `?${key}=${targetQuery[key] || empotyReplactStr}`
    }
  })
  history.pushState(null, null, targetUrlStr)
  return targetUrlStr
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
  const obj = {}
  if (url === undefined) {
    return obj
  }
  const objParams = urlQryToObj(url)
  const decodeStr = objParams.spm
  const decodeData = decode(decodeStr)
  const params = decodeData.split('&')
  params.map(item => {
    const kv = item.split('=')
    obj[kv[0]] = kv[1]
    return kv
  })
  return obj
}

export {
  encode,
  decode,
  isEnStr,
  delayTask,
  countCharacters,
  getQueryString,
  formatFileSize,
  isJson,
  encodeSearchParams,
  urlQryToObj,
  setUrlWithObj,
  encodeUrlParams,
  decodeUrlParams,
}