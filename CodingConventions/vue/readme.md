# vue项目代码规范

## 大纲

- [x] 项目目录结构参考
- [ ] 前端vue项目开发流程
- [ ] JavaScript开发规范
- [ ] ES6规范
- [ ] vue规范

## 项目目录结构参考

``` 
├── index.html                   // 入口页面
├── build                        // 构建脚本目录
│	├── build-server.js      // 运行本地构建服务器，启动 express
│	├── build.js             // 生产环境构建脚本
│	├── dev-client.js        // 开发服务器热重载脚本
│	├── dev-server.js        // 运行本地开发服务器
│	├── vue-loader.conf.js   // 构建相关工具方法
│	├── utils.js             // vue-loader 相关配置
│	├── check-versions.js    // 版本检查
│	├── webpack.base.conf.js // wabpack 基础配置
│	├── webpack.dev.conf.js  // wabpack 开发环境配置
│	└── webpack.prod.conf.js // wabpack 生产环境配置
├── config	                 // 项目配置
│	├── dev.env.js           // 开发环境变量
│	├── index.js             // 项目配置文件
│	├── prod.env.js	         // 生产环境变量
│	└── test.env.js          // 测试环境变量
├── mocker                   // mock 数据目录
│	└── hello.json
├── package.json             // npm 包配置文件，里面定义了项目的 npm 脚本，依赖包等信息
├── src	                     // 项目源码目录
│	├── main.js              // 入口 js 文件
│	├── app.vue              // 根组件
│	├── components           // 公共组件目录
│	│	└── title.vue
│	├── api                  // 接口调用文件夹
│	│	└── httpCore.js	     // 公共 api 接口调用
│	├── assets               // 资源目录，这里的资源会被 wabpack 构建
│	│	└── images
│	│ └── logo.png
│	├── router      // 前端路由
│	│	└── index.js
│	├── util        // 工具目录
│	├── store       // 应用级数据
│	│	└── modules   // 模块
│	│	└── index.js
│	└── page        // 页面目录
│   ├── hello.vue
│   └── notfound.vue
├── static        // 纯静态资源
└── test          // 测试文件目录（unit&e2e）
```

## 开发流程

## JavaScript格式规范

> 使用 ECMAScript 6 作为源码标准。

#### 缩进
使用两个空格为一个缩进单位
``` js
[ 1, 2, 3, 4, 5 ].map( ( value, index, array ) => {
  return value + index;
} );
```


#### 变量
> 见名知意  
> 常量使用 UPPER_CASE_WITH_UNDERLINE 规则  
> 变量使用 lowerCamelCase 规则

``` js
// Good.
const PI = 3.141592653;
const TEAM_NAME = 'Front-end';
let followingProjects = [ 'EPM UI', 'EPM UI Docs', 'and more' ];
  
// Bad.
const Pi = 3.141592653;
const teamname = 'Front-end';
let p = [ 'EPM UI', 'EPM UI Docs', 'and more' ];
```

#### 数组
> 单行定义的数组值间需在逗号后面带一个空格  
> 单行定义的中括号内侧需各带一个空格

``` js
let array1 = [ 1, 2, 3, 4 ];
  
let array2 = [
  'Hello',
  'World!'
];
```

#### 对象
> 单行定义的对象值间需在逗号后面带一个空格  
> 单行定义的大括号内侧需各带一个空格  
> 冒号左侧不需要带空格，右侧带一个空格  
``` js
let obj1 = { key1: 'value1', key2: 'value2', key3: 'value3' };
  
let obj2 = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};
```

#### 字符串
> 适当使用模板字符串  
> 使用单引号定义字符串  
> 当字符串中包含单引号的时候，可适当使用双引号定义字符串  
``` js
let str = 'I am string.';
  
if ( str === "I'm string." ) {
  console.log( 'Great !' );
}
```

#### 函数

> 函数名后紧跟括号
> 参数之间需在逗号后面加空格
> 括号内需在内侧加空格

``` js
function sum( a, b, c ) {
  return a + b + c;
}
  
if ( true ) {
  console.log( sum( 1, 2, 3 ) );
}
```
箭头函数中参数即便只有一个，仍须添加括号
代码块
无关代码块间需要换行

``` js
for ( let i = 0; i < 100; i++ ) {
  // Do something cool here, such as save file for 100 times to ensure it has been saved successfully.
}
 
if ( true ) {
  console.log( "You're fxxking genius!" );
}
```

#### 表达式
表达式中的运算符与操作数之间需要空格

``` js
// Good.
if ( 0 == false && ( 1 == true || '' === false ) ) {
  let result = ( a / b ) % 10;
}
  
// Bad.
if ( 0==false&&( 1==true||''===false ) ) {
  let result=( a/b )%10;
}
```

#### 语句
语句组成部分间需空一格

``` js
// Good.
if ( true ) {
  while ( false ) {
    // Just an example here.
  }
 
  switch ( someValue ) {
    case 'foo':
      console.log( 'bar' );
      break;
    case 'bar':
      console.log( 'foo' );
      break;
    default:
     console.log( "What's that." );
  }
 
  for ( let i = 0; i < 100; i ++ ) {
    // Just an example here.
  }
}
 
// Bad.
if( true ){
  while( false ){
    // Just an example here.
  }
  switch( someValue ){
    case 'foo':
      console.log( 'bar' );
      break;
    case 'bar':
      console.log( 'foo' );
      break;
    default:
      console.log( "What's that." );
  }
  for( let i = 0; i < 100; i ++ ){
    // Just an example here.
  }
}
```

#### 注释
行内注释建议换行，并在所指示的语句之前
紧跟语句的注释需空两格
行内注释双斜杠与注释内容间需空一格
注释内容需为完整语句，中英文和数字间需空一格

``` js
for ( let i = 0; i < 100; i++ ) {
  // This is a comment.
  console.log( 'Print something.' );  // 这又是一个注释。
  // 中文与 English 相结合的注释，带数字 300166 的例子。
}
```

## ES6推荐

#### 优先使用解构赋值

使用数组成员或者对象成员对变量赋值时，优先使用解构赋值。

1. 一般对象数组解构赋值

``` js
// 
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;

// more
const [head, ...tail] = arr; // head = [1], tail = [2, 3, 4]
const { propA, propB } = obj; // 对象解构赋值
```

2. 函数的参数如果是对象的成员，优先使用解构赋值。

``` js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}

// best
function getFullName({ firstName, lastName }) {
}
```

3. 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。

``` js
// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// good
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);
```

#### 对象

``` js
对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。

// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });

// good
const a = { x: null };
a.x = 3;
如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};
另外，对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。

var ref = 'some value';

// bad
const atom = {
  ref: ref,

  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,

  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

#### 5.数组

1. 使用扩展运算符（...）拷贝数组。

```js
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
使用 Array.from 方法，将类似数组的对象转为数组。

const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```

#### 6.函数

``` js
立即执行函数可以写成箭头函数的形式。

(() => {
  console.log('Welcome to the Internet.');
})();
那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。

// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map((x) => {
  return x * x;
});

// best
[1, 2, 3].map(x => x * x);
简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。

```

#### 7.Map结构

注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。

``` js

let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}

8.class
总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。

// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险。

// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}

```
9.promise的使用

一般来说，不要在then方法里面定义失败状态的回调函数(即then的第二个参数)，总是使用catch方法

``` js
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```
