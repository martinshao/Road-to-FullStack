// method 1
function myNew(Func, ...args) {
  const instance = {}
  if (Func.prototype) {
    Object.setPrototypeOf(instance, Func.prototype)
  }
  const res = Func.apply(instance, args)
  if (typeof res === 'function' || (typeof res === 'object' && res !== null)) {
    return res
  }
  return instance
}

// method2
function newOpt(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new TypeError('Type Error')
  }
  const obj = Object.create(ctor.prototype)
  const res = ctor.apply(obj.args)

  const isObject = typeof res === 'object' && res !== null
  const isFunction = typeof res === 'function'
  return isObject || isFunction ? res : obj
}