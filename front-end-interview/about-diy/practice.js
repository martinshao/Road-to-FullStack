// function binaryFind(arr, target) {
//   const len = arr.length;
//   let left = 0,
//     right = len - 1,
//     middle;

//   while (left <= right) {
//     middle = left + ((right - left) >> 1);
//     if (arr[middle] > target) {
//       right = middle - 1;
//     } else if (arr[middle] < target) {
//       left = middle + 1;
//     } else {
//       while (middle >= 0 && arr[middle] === target) {
//         middle--;
//       }
//       return middle++;
//     }
//   }

//   return -1;
// }

// const arr = [1, 2, 3, 5, 7, 8, 9];
// const target = 5;

// console.info(binaryFind(arr, target));

// const deplicate = (arr) => Array.from(new Set(arr));

// const duplicate = (arr) => {
//   let len = arr.length;
//   for (let i = 0; i < len; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (arr[i] === arr[j]) {
//         arr.splice(j, 1);
//         len--;
//         j--;
//       }
//     }
//   }
// };

// const flatten = (arr) => {
//   return arr.reduce((acc, curr) => {
//     return acc.concat(Array.isArray(curr) ? flatten(curr) : curr);
//   });
// };

// function debounce(fn, delay = 100) {
//   let timeout = null;
//   return function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fn.apply(this, args);
//     }, delay);
//   };
// }

// function throttle(fn, delay = 100) {
//   let flag = false;
//   return function (...args) {
//     if (flag) return;
//     flag = true;
//     setTimeout(() => {
//       fn.apply(this, args);
//       flag = false;
//     }, delay);
//   };
// }

// function newOp(ctor, ...args) {
//   if (typeof ctor !== 'function') {
//     throw new TypeError('Type Error');
//   }
//   const obj = Object.create(ctor.prototype);
//   const res = ctor.apply(obj, args);

//   const isObject = typeof res === 'object' && res !== null;
//   const isFunction = typeof res === ' function';
//   return isObject || isFunction ? res : obj;
// }

// function myInstanceof(l, r) {
//   let proto = l.prototype;
//   let prototype = r.prototype;
//   while (true) {
//     if (proto === null) return false;
//     if (proto === prototype) return true;
//     proto = proto.__proto__;
//   }
// }

// Function.prototype.myCall = function (context = globalThis) {
//   const key = Symbol('key');
//   context[key] = this;
//   const args = [...arguments].slice(1);
//   const res = context[key](...args);
//   delete context[key];
//   return res;
// };

// Function.prototype.Mybind = function (context = globalThis) {
//   const key = Symbol('key');
//   context[key] = this;
//   let res;
//   if (arguments[1]) {
//     res = context[key](...arguments[1]);
//   } else {
//     res = context[key]();
//   }
//   delete context[key];
//   return res;
// };

// const toString = (obj) => Object.prototype.toString.call(obj);

// const isArray = (array) => toString(array) === '[object, Array]';

// const isObject = (obj) => typeof obj === 'object';

// function deepClone(obj, map = new WeakMap()) {
//   if (isObject(obj)) {
//     const result = isArray(obj) ? [] : {};
//     if (map.get(obj)) {
//       return map.get(obj);
//     }
//     map.set(obj, result);
//     for (const key in obj) {
//       result[key] = deepClone(obj[key], map);
//     }
//     return result;
//   } else {
//     return obj;
//   }
// }

// class EventBus {
//   constructor() {
//     this.subscription = {};
//   }

//   subscribe(eventType, callback) {
//     const id = Symbol('id');
//     if (!this.subscription[eventType]) this.subscribe[eventType] = {};
//     this.subscription[eventType][id] = callback;
//     return {
//       unsubscribe: function unsubscribe() {
//         delete this.subscription[eventType][id];
//         if (
//           !Object.getOwnPropertySymbols(this.subscription[eventType]).length
//         ) {
//           delete this.subscription[eventType];
//         }
//       },
//     };
//   }

//   publish(eventType, arg) {
//     if (!this.subscription[eventType]) return;

//     Object.getOwnPropertySymbols(this.subscription[eventType]).forEach((key) =>
//       this.subscription[eventType][key](arg)
//     );
//   }
// }

// // notify 是个接口
// function webhook({ errorid, errorMessage }) {
//   notify(error);
// }
// // 超过30分钟未响应 向更广的范围通知
// function notify(error) {}

// // ack为响应接口
// function ack(errorId) {}

// function compose(...func) {
//   if (funcs.length === 0) {
//     return (arg) => arg;
//   }
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }

// function quickSort(arr, left, right) {
//   const len = arr.length;
//   let partitionIndex,
//     left = typeof left !== 'undefined' ? 0 : left,
//     right = typeof right !== 'undefined' ? 0 : right;

//   if (left < right) {
//     partitionIndex = partition(arr, left, right);
//     quickSort(arr, left, partitionIndex - 1);
//     quickSort(arr, partitionIndex - 1, right);
//   }
//   return arr;
// }

// function partition(arr, left, right) {
//   var pivot = left,
//     slow = pivot + 1;
//   for (var fast = slow; fast <= right; fast++) {
//     if (arr[fast] < arr[pivot]) {
//       swap(arr, fast, slow);
//       slow++;
//     }
//   }
//   swap(arr, pivot, slow - 1);
//   return slow - 1;
// }


class EventBus {

  constructor() {
    this.subscription = {}
  }

  subscribe(eventType, callback) {
    const id = Symbol('id')
    if (!this.subscription[eventType]) this.subscription[eventType] = {}
    this.subscription[eventType][id] = callback

    return {
      unsubscribe: (function unsubscribe() {
        delete this.subscription[eventType][id]
        if (!Object.getOwnPropertySymbols(this.subscription[eventType]).length) {
          delete this.subscription[eventType]
        }
      }).bind(this)
    }
  }

  publish(eventType, args) {
    if (!this.subscription[eventType]) return

    Object.getOwnPropertySymbols(this.subscription[eventType])
      .forEach(key => this.subscription[eventType][key](args))
  }
}

const eventBus = new EventBus()

const subscription = eventBus.subscribe('event', args => console.info(args))

eventBus.publish('event', 'message')
eventBus.publish('event', 'hello message')