const arr = [
  { name: 'shaw', age: 12 },
  { name: 'li', age: 13 },
  { name: 'zhang', age: 15 },
  { name: 'wei', age: 16 },
]

const arrFilter = arr.reduce((total, curr) => {
  if (curr.age > 13) {
    return [...total, curr.name]
  } else {
    return [...total]
  }
}, [])