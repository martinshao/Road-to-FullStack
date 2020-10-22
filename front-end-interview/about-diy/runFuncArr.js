const fucArr = [
  next => action => {
    setTimeout(() => {
      console.log(action++);
      next(action)
    }, 300)
  },
  next => action => {
    setTimeout(() => {
      console.log(action++);
      next(action)
    }, 200)
  },
  next => action => {
    setTimeout(() => {
      console.log(action++);
      next(action)
    }, 100)
  }
]

var run = arr => {
  var reduceResult = arr.reduce((pre, next) => (...arg) => pre(next(...arg)));
  return reduceResult(() => {});
}
run(fucArr)(1);

// 实现一个run方法，run方法接收fucArr为参数；返回一个函数，这个函数接收一个参数1，最终，依次输出1、2、3
// run(fucArr)(1) => 1 2 3