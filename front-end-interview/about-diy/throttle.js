function throttle(fn, delay = 50) {
  let flag = false
  return function (...args) {
    if (flag) return;
    flag = true
    setTimeout(() => {
      fn.apply(this, args)
      flag = false
    }, delay);
  }
}