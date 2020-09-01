# JavaScript 中函数的方方面面

## 声明函数

在ECMAScript中，创建函数的最常用的两个方法是函数表达式和函数声明，两者期间的区别是有点晕，因为ECMA规范只明确了一点：函数声明必须带有标示符（Identifier）（就是大家常说的函数名称），而函数表达式则可以省略这个标示符：

在使用函数之前，我们首先要声明(或定义)函数，JavaScript 中声明函数有三种方式，我先简单介绍，后面逐一详细分析区别。

> 1. 函数声明 `function name([param[, param[, ... param]]]) { statements }`
> 2. 函数表达式 `var myFunction = function name([param[, param[, ... param]]]) { statements }`
> 3. 函数生成器声明 `function* name([param[, param[, ...param]]]) { statements }`
> 4. 函数生成器表达式 `function* [name]([param] [, param] [..., param]) { statements }`
> 5. 箭头函数表达式 `([param] [, param]) => { statements } param => expression`
> 3. Function 构造函数 `new Function (arg1, arg2, ... argN, functionBody)`

### 函数声明

```js
function sum(x, y) {
  return x + y;
}
```

关于函数声明，它最重要的一个特征就是函数声明提升，意思是执行代码之前先读取函数声明。这意味着可以把函数声明放在调用它的语句之后。如下代码可以正确执行：

```js
sum(2, 3); // 5

function sum(x, y) {
  return x + y;
}
```

### 函数表达式

```js
const sum = function (x, y) {
  return x + y;
};

sum(2, 3); // 5
```

不同关键字的区别 var let const

## 匿名函数和立即执行函数

## 函数参数

## 函数内部

this 和 arguments

## 函数原型方法

call apply bind...

## 箭头函数

## 柯里化

`function curry() {}`

## 高阶函数

function

## 函数组合
