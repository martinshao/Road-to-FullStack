# 函数式编程之 柯里化 与高阶函数

## 柯里化

```js
// 普通方式
const add1 = function (a, b, c) {
  return a + b + c;
};
// 柯里化
const add2 = function (a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
};
```

