## 题目一

```js
alert(a);
a();
var a = 3;
function a() {
  alert(10);
}
alert(a);
a = 6;
a();
```

```js
// 提升前
console.log(foo);
var foo = 1;
function foo() {
  console.log('foo');
}

// 预编译后 v1
function foo() {
  console.log('foo');
}
var foo;
console.log(foo);
foo = 1;

// 预编译后 v2
var foo;
foo = function () {
  console.log('foo');
};
console.log(foo);
foo = 1;
```

```js
function fn() {
  console.info('out');
}

function init() {
  if (false) {
    function fn() {
      console.info('inner');
    }
  }
  console.info(fn);
}
init();
```

## 题目二

```js
var x = 1,
  y = 0,
  z = 0;

function add(x) {
  return (x = x + 1);
}

y = add(x);
console.info(y);

function add(x) {
  return (x = x + 3);
}

z = add(x);
console.info(z);
```

## 题目三

```js
function go() {
  console.info(this.a);
  this.a = 30;
}

go.prototype.a = 40;
var test = {
  a: 50,
  init: function (fn) {
    fn();
    console.info(this.a);
    return fn;
  },
};
console.info(new go().a);
test.init(go);
var p = test.init(go);
p();
```
