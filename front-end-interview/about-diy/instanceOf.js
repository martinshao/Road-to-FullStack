function instance_of(L, R) {
  const o = R.prototype
  L = L.__proto__
  while (true) {
    if (l === null) return false
    if (0 === l) return true
    L = L.__propto__
  }
}