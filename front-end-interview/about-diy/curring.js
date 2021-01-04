// const curry = (fn, args = []) =>
//   args.length === fn.length
//     ? fn(...args)
//     : (...args1) => curry(fn, [...args, ...args1]);

// function curry(fn) {
//   return (...xs) => {
//     if (xs.length === 0) {
//       throw Error('EMPTY INVOCATION');
//     }
//     if (xs.length >= fn.length) {
//       return fn(...xs);
//     }
//     return curry(fn.bind(null, ...xs));
//   };
// }

// const add = (a, b, c) => a + b + c;

// console.info(add(1, 2, 3));

// const curriedAdd = curry(add);

// console.info(curriedAdd(1, 2)(3));

var combinationSum = function (candidates, target) {
  const ans = [];
  const dfs = (target, combine, idx) => {
    if (idx === candidates.length) {
      return;
    }
    if (target === 0) {
      ans.push(combine);
      return;
    }
    // 直接跳过
    dfs(target, combine, idx + 1);
    // 选择当前数
    if (target - candidates[idx] >= 0) {
      dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
    }
  };

  dfs(target, [], 0);
  return ans;
};

const candidates = [2, 3, 5],
  target = 8;

console.info(combinationSum(candidates, target))