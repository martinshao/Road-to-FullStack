/**
 * 问题：实现一个run方法，使得run(fucArr)能顺序输出1、2、3
 * 这一道前端开发面试题火了！数千名程序员都在思考它
 * https://www.imooc.com/article/283260
 */

const fucArr = [
  next => {
    setTimeout(() => {
      console.log(1);
      next()
    }, 3000)
  },
  next => {
    setTimeout(() => {
      console.log(2);
      next()
    }, 2000)
  },
  next => {
    setTimeout(() => {
      console.log(3);
      next()
    }, 1000)
  }
]

// var run = arr =>{
//   if (arr.length === 0) return;
//   arr[0](() => run(arr.slice(1)));
// }

// var run = arr => {
//   const trigger = () => {
//     if (arr.length === 0) return;
//     arr.shift()();
//   }
//   arr = arr.map(val => {
//     return () => val(trigger);
//   })
//   trigger();
// }

// var run = arr => {
//   const trigger = () => {
//     if (arr.length === 0) return;
//     arr.shift()();
//   }
//   arr = arr.map(val => {
//     return val.bind(null, trigger);
//   })
//   trigger();
// }

var run = arr => {
  const trigger = () => {
    if (arr.length === 0) return;
    arr.shift()();
  }
  arr = arr.map(val => {
    return () => new Promise(resolve => {
      val(resolve)
    }).then(trigger);
  })
  trigger();
}

run(fucArr)