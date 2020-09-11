// step 1

function sum(x, y, z) {
  return x + y + z
}

const sum = x => y => z => x + y + z

// step2
const _sum = (x, y, z) => x + y + z
const sum = x => y => z => _sum(x, y, z)

// step3 抽象的函数柯里化
function curry(fn) {
  const args = []
  return nest(fn, i, args)
}

function nest(fn, i, args) {
  return (x) => {
    args.push(x)
    if (i === fn.length) {
      return fn(...args)
    }

    return nest(fn, i + 1, args)
  }
}

// step4
function curry(fn) {
  const args = []

  function nest(i) {
    return (x) => {
      args.push(x)
      if (i === fn.length) {
        return fn(...args)
      }

      return nest(i + 1)
    }
  }

  return nest(i)
}

// step5 取消闭包，临时变量
function curry(fn) {
  function nest(N, args) {
    return (x) => {
      if (N - 1 === 0) {
        return fn(...args, x)
      }
      return nest(N - 1, [...args, x])
    }
  }

  return nest(fn.length, [])
}

// step6 可变参数柯里化
function curry(fn) {
  function nest(N, args) {
    return (...xs) => {
      if (N - xs.length <= 0) {
        return fn(...args, ...xs)
      }
      return nest(N - xs.length, [...args, ...xs])
    }
  }

  return nest(fn.length, [])
}

function curry(fn) {
  function nest(N, args) {
    return (...xs) => {
      if (xs.length === 0) { // 避免空括号
        throw Error('EMPTY INVOCATION');
      }
      if (N - xs.length <= 0) {
        return fn(...args, ...xs)
      }
      return nest(N - xs.length, [...args, ...xs])
    };
  }
  return nest(fn.length, []);
}

// step 7 可变参数柯里化 + bind
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

// step8 严格意义的柯里化
function strictCurry(fn) {
  return (x) => {
    if (fn.length <= 1) {
      return fn(x);
    }
    return strictCurry(fn.bind(null, x));
  };
}

/****************** 另一种思路柯里化 ******************/

// step1 希望累加的数量是动态灵活的
function add() {
  const _args = []
  return function _add() {
    if (arguments.length === 0) {
      return _args.reduce((acc, curr) => acc + curr)
    }

    [].push.apply(_args, arguments)
    return _add
  }
}

// step2 对计算逻辑进行拆分
function curry(fn) {
  const _args = []
  return function _fn() {
    if (arguments.length === 0) {
      return fn.apply(null, _args)
    }
    [].push.apply(_args, arguments)
    return _fn
  }
}

function reducer() {
  return [].reduce.call(arguments, (acc, curr) => acc + curr)
}

// step3 自动求值
function curry(fn) {
  const _len = fn.length
  const _args = []
  return function _fn() {
    Array.prototype.push.apply(_args, arguments)
    if (_args.length < _len) {
      return _fn
    }
    return fn.apply(null, _args)
  }
}

const add = (a, b, c) => a + b + c
const adder = curry(add)
adder(1)(2)(3)

// 通用实现 固定的参数是一个函数
function currying(fn) {
  var slice = Array.prototype.slice,
    __args = slice.call(arguments, 1);
  return function () {
    var __inargs = slice.call(arguments);
    return fn.apply(null, __args.concat(__inargs));
  };
}

function square(i) {
  return i * i;
}

function dubble(i) {
  return i *= 2;
}

function map(handeler, list) {
  return list.map(handeler);
}

var mapSQ = currying(map, square);
console.info(mapSQ([1, 2, 3, 4, 5]))

// 另外一种形式
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

log = _.curry(log);
log(new Date(), "DEBUG", "some debug");
log(new Date())("DEBUG")("some debug");
let logNow = log(new Date());
logNow("INFO", "message");
let debugNow = logNow("DEBUG");
debugNow("message");


function partial(func, ...argsBound) {
  return function (...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method that says something now by fixing the first argument
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] Hello, John!

function curry(f) {
  return function (...args) {
    // if args.length == f.length (as many arguments as f has),
    //   then pass the call to f
    // otherwise return a partial function that fixes args as first arguments
  };
}