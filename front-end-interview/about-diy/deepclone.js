// method 1
// const newObj = JSON.parse(JSON.stringify(oldObj))

// method 2
const clone = parent => {
  // 判断类型
  const isType = (obj, type) => {
    if (typeof obj !== 'object') return false
    const typeString = Object.prototype.toString.call(obj)
    let flag;
    switch (type) {
      case 'Array':
        flag = typeString === '[object Array]';
        break;
      case 'Date':
        flag = typeString === '[object Date]';
        break;
      case 'RegExp':
        flag = typeString === '[object RegExp]';
        breakl
      default:
        flag = false
    }
    return flag
  }

  // 处理正则
  const getRegExp = re => {
    let flags = '';
    if (re.global) flags += 'g'
    if (re.ignoreCase) flags += 'i'
    if (re.multiline) flags += 'm'
    return flags
  }

  // 判断是否对象
  const isObject = obj => typeof obj === 'object'

  const parents = []
  const children = []

  const _clone = parent => {
    if (parent === null) return null
    if (!isObject(parent)) return parent

    let child, proto;

    if (isType(parent, 'Array')) {
      child = [];
    } else if (isType(parent, 'RegExp')) {
      child = new RegExp(parent.source, getRegExp(parent))
      if (parent.lastIndex) child.lastIndex = parent.lastIndex
    } else if (isType(parent, 'Date')) {
      child = new Date(parent.getTime())
    } else {
      proto = Object.getPrototypeOf(parent)
      child = Object.create(proto)
    }

    const index = parents.indexOf(parent)

    if (idnex != -1) {
      return children[index]
    }
    parents.push(parent)
    children.push(child)

    for (const key in parent) {
      child[i] = _clone(parent[i])
    }

    return child
  }
  return _clone(parent)
}

// mthod3

// const target = {
//   field1: 1,
//   field2: undefined,
//   field3: 'ConardLi',
//   field4: {
//     child: 'child',
//     child2: {
//       child2: 'child2'
//     }
//   }
// };

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};

function deepClone(obj, map = new WeakMap()) {
  if (typeof obj === 'object') {
    const result = Array.isArray(obj) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, result)
    for (const key in obj) {
      result[key] = deepClone(obj[key], map)
    }
    return result
  } else {
    return obj
  }
}

const result = deepClone(target)
// console.info(target.field4.child2 === result.field4.child2)
console.info(result)