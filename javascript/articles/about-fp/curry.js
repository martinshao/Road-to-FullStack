// const add = () => {
//   const _args = []
//   return function () {
//     if (arguments.length === 0) {
//       return _args.reduce((a, b) => a + b)
//     }

//     [].push.apply(_args, arguments);
//     return arguments.callee
//   }
// }

// var sum = add();
// sum(100, 200)(300)
// console.info(sum())

// const curry = function (fn) {
//   const _args = [];
//   return function () {
//     if (arguments.length === 0) {
//       return fn.apply(fn, _args);
//     }
//     [].push.apply(_args, arguments);
//     return arguments.callee;
//   }
// }
// const multi = function () {
//   return [].reduce.call(arguments, function (a, b) {
//     return a + b;
//   })
// }

// var add = curry(multi);
// add(100, 200, 300)(400);
// add(1000);
// add();

say()

// function say() {
//   console.info('I want to be rich')
// }

var say = function () {
  console.info('I want to be rich')
}