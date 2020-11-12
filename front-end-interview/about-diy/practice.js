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
