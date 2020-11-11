const curry = (fn, args = []) =>
  args.length === fn.length
    ? fn(...args)
    : (...args1) => curry(fn, [...args, ...args1]);
