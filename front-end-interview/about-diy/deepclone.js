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
    child1: 'child',
    child2: {
      grandson: {
        name: 'Martin',
        sex: 'man'
      }
    }
  },
  field4: [2, 4, 8],
  field5: null
};

const mapType = '[object Map]'
const setType = '[object Set]'
const arrayType = '[object Array]'
const objectType = '[object Object]'

const boolType = '[object Object]'
const dataType = '[object Date]'
const errorType = '[object Error]'
const numberType = '[object Number]'
const regexptype = '[object RegExp]'
const stringType = '[object String]'
const symbolType = '[object Symbol]'

const toString = obj => Object.prototype.toString.call(obj)
// const isObject = obj = toString(obj) === '[object Object]'
const isArray = arr = toString(arr) === '[object Array]'

const isObject = obj => typeof obj === 'object'

// 这已经很好
function deepClone(obj, map = new WeakMap()) {
  if (isObject(obj)) {
    const result = isArray(obj) ? [] : {}
    if (map.get(obj)) {
      return map.get(obj)
    }
    map.set(obj, result)
    for (const key in obj) {
      result[key] = deepClone(obj[key], map)
    }
    return result
  } else {
    return obj
  }
}

function forEach(array, iterate) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iterate(array[index], index)
  }
  return array
}

function deepClone(obj, map = new WeakMap()) {
  const isArr = isArray(obj)

  if (isObject(obj)) {
    const result = isArr ? [] : {}
    if (map.get(obj)) {
      return map.get(obj)
    }
    map.set(obj, result)
    const keys = isArr ? undefined : Object.keys(obj)
      (keys || obj).forEach((item, key) => {
        if (keys) {
          key = item
        }
        result[key] = deepClone(obj[key], map)
      })
    return result
  } else {
    return obj
  }
}

const result = deepClone(target)
// console.info(target.field4.child2 === result.field4.child2)
console.info(result)


const mapType = '[object Map]';
const setType = '[object Set]';
const arrayType = '[object Array]';
const objectType = '[object object]';
const argsType = '[object arguments]';

const boolType = '[object Boolean]';
const dateType = '[object Date]';
const numberType = '[object Number]';
const stringType = '[object String]';
const symbolType = '[object Symbol]';
const errorType = '[object Error]';
const regexpType = '[object RegExp]';
const funcType = '[object function]';

const deepType = [mapType, setType, arrayType, objectType, argsType];

function isObject(obj) {
  const type = typeof obj;
  return type !== null && (type === 'object' || type === 'function');
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

function cloneFunction(target) {
  return target;
}

function cloneOtherType(target) {
  const Ctor = target.constructor;
  switch (type) {
    case boolType:
    case dateType:
    case stringType:
    case numberType:
    case errorType:
      return new Ctor(target);
    case regexpType:
      return cloneReg(target);
    case symbolType:
      return cloneSymbol(target);
    case funcType:
      return cloneFunction(target);
    default:
      return null;
  }
}

const getType = (target) => Object.prototype.toString.call(target);

function clone(target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target;
  }

  const type = getType(target);
  let cloneTarget;
  if (deepType.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target);
  }

  if (map.get(target)) {
    return target;
  }
  map.set(target, cloneTarget);

  if (type === setType) {
  }
  if (type === mapType) {
  }

  const keys =
    type === arrayType
      ? undefined
      : Object.keys(target)

      (keys || target).forEach((value, key) => {
        if (keys) {
          key = value;
        }
        cloneTarget[key] = clone(target[key], map);
      });
}

function deepClone(obj, cache = new WeakMap()) {
  if (obj === null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj

  if(cache.get(obj)) return cache.get(obj)
  let cloneObj = new obj.constructor()
  cache.set(obj, cloneObj)
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], cache)
    }
  }
  return cloneObj
}