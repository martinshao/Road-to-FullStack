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