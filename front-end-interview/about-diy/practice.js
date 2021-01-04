function binaryFind(arr, target) {
  const len = arr.length;
  let left = 0,
    right = len - 1,
    middle;

  while (left <= right) {
    middle = left + ((right - left) >> 1);
    if (arr[middle] > target) {
      right = middle - 1;
    } else if (arr[middle] < target) {
      left = middle + 1;
    } else {
      while (middle >= 0 && arr[middle] === target) {
        middle--;
      }
      return middle++;
    }
  }

  return -1;
}

const arr = [1, 2, 3, 5, 7, 8, 9];
const target = 5;

console.info(binaryFind(arr, target));

const deplicate = (arr) => Array.from(new Set(arr));

const duplicate = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        len--;
        j--;
      }
    }
  }
};

const flatten = (arr) => {
  return arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flatten(curr) : curr);
  });
};

function debounce(fn, delay = 100) {
  let timeout = null;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function throttle(fn, delay = 100) {
  let flag = false;
  return function (...args) {
    if (flag) return;
    flag = true;
    setTimeout(() => {
      fn.apply(this, args);
      flag = false;
    }, delay);
  };
}

function newOp(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new TypeError('Type Error');
  }
  const obj = Object.create(ctor.prototype);
  const res = ctor.apply(obj, args);

  const isObject = typeof res === 'object' && res !== null;
  const isFunction = typeof res === ' function';
  return isObject || isFunction ? res : obj;
}

function myInstanceof(l, r) {
  let proto = l.prototype;
  let prototype = r.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}

Function.prototype.myCall = function (context = globalThis) {
  const key = Symbol('key');
  context[key] = this;
  const args = [...arguments].slice(1);
  const res = context[key](...args);
  delete context[key];
  return res;
};

Function.prototype.Mybind = function (context = globalThis) {
  const key = Symbol('key');
  context[key] = this;
  let res;
  if (arguments[1]) {
    res = context[key](...arguments[1]);
  } else {
    res = context[key]();
  }
  delete context[key];
  return res;
};
