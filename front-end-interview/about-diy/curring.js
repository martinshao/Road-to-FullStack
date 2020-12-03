// const curry = (fn, args = []) =>
//   args.length === fn.length
//     ? fn(...args)
//     : (...args1) => curry(fn, [...args, ...args1]);

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

const add = (a, b, c) => a + b + c;

console.info(add(1, 2, 3));

const curriedAdd = curry(add);

console.info(curriedAdd(1, 2)(3));
