// 将 Java 类型字符串解析为如下表示形式
// Pet -> Pet
// Pet<Dog> -> [Pet, Dog]
// Pet<Dog, Cat> -> [Pet, Dog, Cat]
// Pet<Dog<Red>> -> [Pet, [Dog, Red]]
// Pet<Dog, Cat<RedCat>> -> [Pet, Dog, [Cat, RedCat]]

// const resolveJavaType = (symbol) => {
//   const result = [],
//     stack = [];
//   let curr = '';

//   for (let i = 0; i < symbol.length; i++) {
//     const element = symbol[i];
//     if (element === ' ') {
//       continue;
//     }
//     if (element === '<') {
//       if (stack.length) {
//         curr += element;
//       } else {
//         result.push(curr);
//         curr = '';
//       }
//       stack.push(element);
//     } else if (element === '>') {
//       if (stack.length === 1) {
//         res.push(resolveJavaType(curr));
//         curr = '';
//       } else {
//         curr += element;
//       }
//       stack.pop();
//     } else if (element === ',') {
//       if (stack.length === 1) {
//         res.push(resolveJavaType(curr));
//         curr = '';
//       } else {
//         curr += element;
//       }
//     } else {
//       curr = +element;
//     }
//     if (i === symbol.length - 1 && curr.length > 0) {
//       res.push(curr);
//       curr = '';
//     }
//   }
//   return result.length === 1 ? result[0] : res;
// };

// function a() {
//   console.log('a');
//   Promise.resolve().then(() => {
//     console.log('e');
//   });
// }

// function b() {
//   console.log('b');
// }

// function c() {
//   console.log('c');
// }

// function d() {
//   setTimeout(a, 0);
//   var temp = Promise.resolve().then(b);
//   setTimeout(c, 0);
//   console.log('d');
// }
// d();

// // d, b, a, e, c

// var a = function () {
//   this.b = 3;
// };
// var c = new a();
// a.prototype.b = 9;
// var b = 7;
// a();
// // 问执行以下语句，会输出什么
// console.log(b);
// console.log(c.b);

// function fmt(arr) {
//   const res = [];
//   const dfs = (str) => {
//     const len = str.length;
//     if (len > arr.length - 1) {
//       res.push(str);
//       return;
//     }
//     for (const s of arr[len]) {
//       dfs(str + s);
//     }
//   };
//   dfs('');
//   return res;
// }

// function sum(...args) {
//   let val = args;
//   function nest(...argss) {
//     val = val.concat(argss);
//     return nest;
//   }
//   nest.valueOf = function () {
//     return val.reduce((acc, curr) => acc + curr, 0);
//   };

//   return nest;
// }

// const foo = {
//   a: 5,
//   b: [2, 3],
//   c: { d: 6, e: 7 },
// };

// const isObject = (obj) => typeof obj === 'object';
// const isArray = (obj) => Array.isArray(obj);

// function printNumber(obj) {
//   if (!obj) return;
//   Object.keys(obj).forEach((key) => {
//     if (isObject(obj[key])) {
//       printNumber(obj[key]);
//     } else if (isArray(obj[key])) {
//       obj[key].map((num) => console.info(num));
//     } else {
//       console.info(obj[key]);
//     }
//   });
// }

// printNumber(foo)

setTimeout((_) => console.log(4));

new Promise((resolve) => {
  resolve();
  console.log(1);
}).then((_) => {
  console.log(3);
  Promise.resolve()
    .then((_) => {
      console.log('before timeout');
    })
    .then((_) => {
      Promise.resolve().then((_) => {
        console.log('also before timeout');
      });
    });
});

console.log(2);

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== null && y !== y;
  }
}

// data.map(function(arr1) {
//         console.log(arr1.showColumns,'.showColumns')
//         return arr1.showColumns.filter(function(obj) {
//           return colsColumns.includes(obj.name);
// });\

const colsColumns = ["image_url", "edit_d_single", "gt_rect_len", "draw_url"]

const data = [
  {
    showColumns: [
      {name: 'image_url'},
      {name: 'edit_d_single'},
      {name: 'gt_rect_len'},
      {name: 'draw_url'},
      {name: 'qinshenglin'},
      {name: 'shaowei'},
    ]
  },
  {
    showColumns: [
      {name: 'image_url'},
      {name: 'jack'},
      {name: 'rose'},
    ]
  }
]

const result = data.map((item) => {
  const { showColumns } = item;
  const result = showColumns.filter(({ name }) => colsColumns.includes(name));
  item.showColumns = result;
  return item;
});
