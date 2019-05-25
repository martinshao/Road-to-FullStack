setTimeout(function() {
  console.info(1);
}, 0);

setImmediate(function() {
  console.info(2);
});

process.nextTick(() => {
  console.info(3);
});

new Promise((resolve, reject) => {
  console.info(4);
  resolve(4);
}).then(function() {
  console.log(5)
})

console.info(6)

// 变量对象VO存储上下文中声明的以下内容
{
  // 1-1 函数声明FD（如果在函数上下文中），--不包含函数表达式
  //1-2 函数形参
  // 1-3 变量声明
  // 
}

var a = 10;

function text(x) {
  var b = 20;
}

TextTrackList(30);

// 全局上下文的变量对象
// void(globalContext) = {
//   a: 10,
//   test: <reference to function>
// }

// test函数上下文的变量对象
VO(test)

var aa = 11;

function foo(b) {
  var a = 10;
  return a + b + aa;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}
console.log(bar(7));

barEC = {
  VO: {
    a: 10,
    foo: '<reference to function>'
  },
  [[Scope]]: '<reference to scope chain>',
  this: '<reference to this binding>'
}