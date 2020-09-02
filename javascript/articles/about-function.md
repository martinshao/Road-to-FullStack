# JavaScript 中函数的方方面面

## 声明函数

在 ECMAScript 中，创建函数的最常用的两个方法是函数表达式和函数声明，两者期间的区别是有点晕，因为 ECMA 规范只明确了一点：函数声明必须带有标示符（Identifier）（就是大家常说的函数名称），而函数表达式则可以省略这个标示符：

在使用函数之前，我们首先要声明(或定义)函数，JavaScript 中声明函数有三种方式，我先简单介绍，后面逐一详细分析区别。

> 1. 函数声明 `function name([param[, param[, ... param]]]) { statements }`
> 2. 函数表达式 `var myFunction = function name([param[, param[, ... param]]]) { statements }`
> 3. 函数生成器声明 `function* name([param[, param[, ...param]]]) { statements }`
> 4. 函数生成器表达式 `function* [name]([param] [, param] [..., param]) { statements }`
> 5. 箭头函数表达式 `([param] [, param]) => { statements } param => expression`
> 6. Function 构造函数 `new Function (arg1, arg2, ... argN, functionBody)`

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

首先要注意的是函数表达式不存在

不同关键字的区别 var let const

函数表达式如果是声明前调用的，就会出现跟函数声明不一样情形，出现了报错。追根究底是因为函数表达式是将一个匿名函数赋值给了对象。所以这里在 JavaScript 上下文初始化的时候发生的是变量提升，所以在运行 typeof sum 会给出 undefined ，跟提前使用声明的变量一样的情况。

```js
typeof sum; // undefined
sum(2, 3); // Uncaught TypeError: sum is not a function

var sum = function (x, y) {
  return x + y;
};
```

ES6 时代的到来，声明变量的关键字多出了 let const，函数表达式跟一般声明变量的表达式没什么区别，所以要注意的问题也相似。let、const 拥有了块级作用域，const 声明的变量引用无法改变等，同样适用于函数表达式。

```js
sum(2, 3); // Uncaught ReferenceError: Cannot access 'sum' before initialization

const sum = function (x, y) {
  return x + y;
};
```

日常开发中，我比较喜欢在函数表达式中用 const 表达式，保持声明的变量对匿名函数的引用。

## 匿名函数和立即执行函数

## 函数参数

### 参数个数

JavaScript 真的是非常灵活的语言。在声明函数参数（这里是形参）的时候，不用在意传递参数的个数，甚至不用传也可以(其实是有个最大个数的限制，一个函数最多可以有 255 个参数)。另一方面，JavaScript 对函数参数的类型也不做校验，因此在调用的时候（这里是实参），传递的参数理论上可以是任何类型。

JavaScript 函数参数另外一个灵活的地方在于，在调用函数的时候，JavaScript 完全不会对参数个数和类型，跟声明的时候做对比检查。

```js
function sum(x, y) {
  return x + y;
}
sum(); // NaN

function greet() {
  console.info('Hello World.');
}

greet('Martin'); // Hello World.
```

理论上上面这么做，没有任何问题，但肯定是不值得提倡的，后面我们可以尝试用 arguments 这个对象对函数 不定参数 这个特性加以利用。

### 同名参数

在非严格模式下，函数中可以出现同名形参，且只能访问最后出现的该名称的形参。

```js
function add(x, x, x) {
  return x;
}
console.log(add(1, 2, 3)); //3
```

而在严格模式下，出现同名形参会抛出语法错误

```js
function add(x, x, x) {
  'use strict';
  return x;
}
console.log(add(1, 2, 3)); //SyntaxError: Duplicate parameter name not allowed in this context
```

### 函数的形参与实参

参数有形参（parameter）和实参（argument）的区别，形参相当于函数中定义的变量，实参是在运行时的函数调用时传入的参数。

实参：从字面意义我们可以理解为“实际存在的参数”，是在函数调用时传给函数的变量，该变量在函数执行时必须存在。实参可以为变量、常量、函数、表达式等。
形参：从字面意义我们可以理解为“形式上存在的参数”，由此我们可以看出它并不是真实存在的参数，又称为虚拟变量。它在函数定义时使用，作用为接收函数调用时的实参。

在 JavaScript 中实参与形参数量并不需要像 JAVA 一样必须在数量上严格保持一致，具有很大的灵活性。如下：

```js
function test(str1, str2, str3) {
  // ......
}
test(); // str1: undefined, str2: undefined, str3: undefined
test('hello'); // str1: 'hello', str2: undefined, str3: undefined
test('hello', 'world'); // str1: 'hello', str2: 'world', str3: undefined
test('hello', 'world', '!'); // str1: 'hello', str2: 'world', str3: '!'
```

在 JavaScript 代码运行过程中，形参的作用为接收实参，它们两个分别位于不同的内存地址中，大致可以分为两种情况：

实参为原始值。当实参为原始值时,此时形参为实参的拷贝。因此，函数体内形参值的改变并不会影响实参。

```js
function test(str) {
  str = 'chinese';
  return str;
}
const str1 = 'china';
const str2 = test(str1);
console.log(str1); // china
console.log(str2); // chinese
```

实参为引用值。当实参为引用值时，此时形参为实参内存地址的拷贝。因此，函数体内形参值的变化在一定情况下将会影响实参。

```js
function test(obj) {
  // 形参obj的值实际上为实参obj的内存引用，及形参与实参同时指向同一个内存地址。
  obj.name = 'typeScript'; // 此时改变的为形参与实参同时指向的那个内存地址中的值
  // 所以此时也导致实参的name属性发生了变化
  obj = {
    // 此时对形参obj进行重新赋值，给予了它一个新的内存地址
    name: 'react', // 从此之后的形参将于实参完全解绑，两者之前不再存在联系
    star: 13000,
  };
  obj.star = 20000; // 所以这里仅仅是改变了形参的star属性
  return obj;
}
const obj1 = {
  name: 'javaScript',
  star: 100000,
};
const obj2 = test(obj1);
console.log(obj1); // name: 'typeScript', star: 100000
console.log(obj2); // name: 'react', star: 20000
```

## arguments 对象

JavaScript 函数内部有一个 arguments 对象，该对象算是蛮重要的一个概念。

> arguments 是一个对应于传递给函数的参数的类数组对象。
> 类数组这个概念的意思是，arguments 对象拥有 length 属性和从 0 开始的下标属性，但是它没有内置对象 Array 那样拥有诸如 forEach() 方法和 map() 方法。

arguments 对象是所有（非箭头）函数中都可用的局部变量。我们可以使用 arguments 对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引 0 处。上文中我们说到函数 不定参数 的概念，对于声明时未传递参数，调用时却传递参数这种情况，arguments 就有了用武之地。下面代码运行起来没有任何差别

```js
function func1(a, b, c) {
  console.log(arguments[0]); // 1
  console.log(arguments[1]); // 2
  console.log(arguments[2]); // 3
}
func1(1, 2, 3);

function func2() {
  console.log(arguments[0]); // 1
  console.log(arguments[1]); // 2
  console.log(arguments[2]); // 3
}
func2(1, 2, 3);
```

参数也可以被设置：

```js
arguments[1] = 'new value';
```

arguments 对象不是一个 Array 。它类似于 Array，但除了 length 属性和索引元素之外没有任何 Array 属性。例如，它没有 pop 方法。但是它可以被转换为一个真正的 Array：

```js
// ES2015 之前
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```

### arguments 属性

> arguments.callee 指向参数所属的当前执行的函数。
> arguments.length 传递给函数的参数数量。
> arguments[@@iterator] 返回一个新的 Array 迭代器 对象，该对象包含参数中每个索引的值。

### 用法实例

遍历参数求和

这个也是典型的 不定参数 的用法，声明时不指定参数的个数，而是在调用时根据需要传递参数。

```js
function add() {
  var sum = 0,
    len = arguments.length;
  for (var i = 0; i < len; i++) {
    sum += arguments[i];
  }
  return sum;
}
add(); // 0
add(1); // 1
add(1, 2, 3, 4); // 10
```

## this 和 arguments

this 和 arguments 是函数内部两个非常重要的对象。

## 函数原型方法

call apply bind...

## 箭头函数

## 柯里化

`function curry() {}`

## 高阶函数

function

## 函数组合
