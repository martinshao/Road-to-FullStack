const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class CPromise {

  constructor(executor) {
    this.status = PENDING;
    this.onFulfilled = []
    this.onRejected = []

    function resolve(value) {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value
        this.onFulfilled.forEach(fn => fn())
      }
    }

    function reject(reason) {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason
        this.onRejected.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value = value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw Error(reason)
    }

    const promise2 = new CPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else {
        this.onFulfilled.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejected.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }

      return promise2
    })
  }

  catch (onRejected) {
    return this.then(null, onRejected)
  }

  // finally
  finally(callback) {
    return this.then(
      value => CPromise.resolve(callback()).then(() => value),
      error => CPromise.resolve(callback()).then(() => {
        throw error
      })
    )
  }

  static resolve(param) {
    if (param instanceof CPromise) {
      return param
    }

    return new CPromise((resolve, reject) => {
      if (param && typeof param === 'object' && typeof param.then === 'function') {
        setTimeout(() => {
          param.then(resolve, reject)
        })
      } else {
        resolve(param)
      }
    })
  }

  static reject(reason) {
    return new CPromise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    promises = Array.from(promises)
    return new CPromise((resolve, reject) => {
      let index = 0;
      const result = []
      if (promises.length === 0) {
        resolve(result)
      } else {
        function processValue(i, data) {
          result[i] = data
          if (++index === promises.length) {
            resolve(result)
          }
        }
        promises.forEach((p, i) => {
          CPromise.resolve(
            p.then(
              data => processValue(i, data),
              error => {
                reject(error)
                return;
              }
            )
          )
        })
      }
    })
  }

  static race(promises) {
    return new CPromise((resolve, reject) => {
      if (promises.length === 0) {
        return;
      } else {
        for (let i = 0; i < promises.length; i++) {
          CPromise.resolve(promises[i].then(
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
}

function resolvePromise(promise, x, resolve, reject) {
  const self = this
  if (promise === x) {
    reject(new TypeError('Chaining cycle'))
  }

  if (x && typeof x === 'object' || typeof x === 'function') {
    let used;
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          self,
          (y) => {
            if (used) return;
            used = true
            resolvePromise(promise, y, resolve, reject)
          },
          (r) => {
            if (used) return;
            used = true;
            resolvePromise(promise, r, resolve, reject)
          })
      } else {
        resolve(x)
      }
    } catch (error) {
      reject(x)
    }
  } else {
    resolve(x)
  }
}