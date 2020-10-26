/**
 * 基于axios封装的retry请求工具
 * 请求超时重试，重试间隔时间设置
 */

const MAX_RETRY = 3;
const RETRY_INTERVAL = 500;
const REQUEST_TIMEOUT = 5 * 1000;

function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

async function request(
  url,
  method,
  params,
  retry = MAX_RETRY,
  hookResult = null
) {
  let res, requireRetry;
  try {
    let config = {
      url,
      method,
      timeout: REQUEST_TIMEOUT
    }
    if (Object.is(method, 'get')) {
      config['params'] = params
    } else {
      config['data'] = params
    }
    res = await axios.request(config)
    if (res && res.status > 500) {
      console.info('response status: ', res.status)
      requireRetry = true
    }
    if (hookResult && !hookResult(res)) {
      console.info('Not expect, need to retry')
      requireRetry = true
    }
  } catch (error) {
    console.error(error)
    requireRetry = true
  }
  if (requireRetry && retry > 0) {
    await delay(RETRY_INTERVAL)
    console.info('RETRY')
    res = await request(url, method, params, --retry, hookResult)
  }
}