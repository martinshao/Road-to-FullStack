//例题1
// console.log('script start');

// setTimeout(function () {
//   console.log('setTimeout');
// }, 0);

// Promise.resolve().then(function () {
//   console.log('promise1');
// }).then(function () {
//   console.log('promise2');
// });

// console.log('script end');

// script star tscript end  promise1  promise2 setTimeout

console.log(1);
setTimeout(function () {
  console.log(2);
  new Promise(function (resolve, reject) {
    console.log(3);
    resolve();
  }).then(res => {
    console.log(4);
  })
});
setTimeout(function () {
  console.log(5);
})
console.log(6);

// 1 6 2 3 4 5
