// const sum = (x, y, z) => x + y + z


// const sum = x => y => z => x + y + z

// function sum(x) {
//   return function (y) {
//     return function (z) {
//       return x + y + z
//     }
//   }
// }

const sum = (x, y, z) => x + y + z

const curry = fn => x => y => z => fn(x, y, z)

console.info(curry(sum)(1)(2)(3))



function curry(fn) {
  if (fn.length === 0) {
    return fn;
  }
  const args = [];

  function nest(i) { // 相比于之前，不用传递 fn 和 args
    return (x) => {
      args.push(x);
      if (i === fn.length) {
        return fn(...args);
      }
      return nest(i + 1);
    };
  }
  return nest(1);
}

const log2 = curry((x, y) => console.log(x, y));

log2(10)(20);

sum3(1, 2, 3) // 清晰的
sum3(1, 2)(3)
sum3(1)(2, 3)
sum3(1)(2)(3) // 柯里化的

function curry(fn) {
  function nest(N, args) {
    return (...xs) => {
      if (N - xs.length <= 0) {
        return fn(...args, ...xs);
      }
      return nest(N - xs.length, [...args, ...xs]);
    };
  }
  return nest(fn.length, []);
}

function curry(fn) {
  function nest(N, args) {
    return (...xs) => {
      if (xs.length === 0) { // 避免空括号
        throw Error('EMPTY INVOCATION');
      }
      // ...
    };
  }
  return nest(fn.length, []);
}

function curry(fn) {
  return (...xs) => {
    if (xs.length === 0) {
      throw Error('EMPTY INVOCATION');
    }
    if (xs.length >= fn.length) {
      return fn(...xs);
    }
    return curry(fn.bind(null, ...xs));
  };
}

function sum() {
  var _args = [];
  return function () {
    if (arguments.length === 0) {
      return _args.reduce(function (a, b) {
        return a + b;
      })
    }
    [].push.apply(_args, arguments);
    return arguments.callee;
  }
}

var curry = function (fn) {
  var _args = [];
  return function () {
    if (arguments.length === 0) {
      return fn.apply(fn, _args);
    }
    [].push.apply(_args, arguments);
    return arguments.callee;
  }
}
var multi = function () {
  return [].reduce.call(arguments, function (a, b) {
    return a + b;
  })
}

const a = [1, 2, 3]
const b = [5, 6, 7]

Array.prototype.push.apply(a, b)

([].push.apply(a, b))

function sum(x, y, z) {
  console.info(x, y, z)
  console.info(arguments)
  return x + y + z
}

const sum1 = sum.bind(null, 1)
const sum2 = sum1.bind(null, 2)
const sum3 = sum2.bind(null, 3)

function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
  return arg1 + arg2
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var result1 = addArguments(1, 2); // 3

// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);

// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37);

var list2 = leadingThirtysevenList();
// [37]

var list3 = leadingThirtysevenList(1, 2, 3);
// [37, 1, 2, 3]

var result2 = addThirtySeven(5);
// 37 + 5 = 42 

var result3 = addThirtySeven(5, 10);

function sum(x, y, z) {}
const args = [0, 1, 2];
sum.apply(null, args)

function sum(x, y, z) {}
const args = [0, 1, 2];
sum(...args);

function func(v, w, x, y, z) {}
var args = [0, 1];
func(-1, ...args, 2, ...[3]);

function list() {
  return [...arguments];
}

function list() {
  return Array.prototype.slice.call(arguments);
}

function curry(fn) {
  const args = []

  function nest(N) {
    return (x) => {
      args.push(x)
      if (N === fn.length) {
        return fn(...args)
      }

      return nest(N + 1)
    }
  }

  return nest(1)
}
