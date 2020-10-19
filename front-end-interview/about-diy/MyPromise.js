const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor) {
  let self = this;
  self.status = PENDING;
  self.onFulfilled = [];
  self.onRejected = [];

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach(fn => fn())
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach(fn => fn())
    }
  }

  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  }
  let self = this;
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      })
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(e)
          }
        })
      })
    }
  })

  return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
  let self = this
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle'));
  }

  if (x && typeof x === 'object' || typeof x === 'function') {
    let used; // 只能调用一次
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(self, (y) => {
          if (used) return;
          used = true
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (used) return;
          used = true
          reject(r)
        })
      } else {
        if (used) return;
        used = true;
        resolve(x)
      }

    } catch (error) {
      if (used) return;
      used = true;
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.resolve = function (param) {
  if (param instanceof Promise) {
    return param
  }

  return new Promise((resolve, reject) => {
    if (param && typeof param === 'object' && typeof param.then === 'function') {
      setTimeout(() => {
        param.then(resolve, reject)
      })
    } else {
      resolve(param)
    }
  })
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.prototype.finally = function (callback) {
  return this.then((value) => {
    return Promise.resolve(callback()).then(() => {
      return value
    })
  }, (error) => {
    return Promise.resolve(callback()).then(() => {
      throw error
    })
  })
}

Promise.all = function (promises) {
  promises = Array.from(promises);
  return new Promise((resolve, reject) => {
    let index = 0;
    let result = [];
    if (promises.length == 0) {
      resolve(result)
    } else {
      function processValue(i, data) {
        result[i] = data
        if (++index === promises.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i].then(
          data => processValue(i, data),
          error => {
            reject(error)
            return;
          }
        ))
      }
    }
  })
}

Promise.race = function (promises) {
  promises = Array.from(promises)
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return;
    } else {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i].then(
          data => {
            resolve(data)
            return;
          },
          error => {
            reject(error)
            return;
          }
        ))
      }
    }
  })
}