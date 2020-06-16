# React项目中常见warning级别的lint报错整理

## 报警最多代码整理

```
/Users/shaogucheng/Desktop/code/work/aliyun/viapi-admin-web-front/src/containers/ContIntgr/Prod/index.js
/Users/shaogucheng/Desktop/code/work/aliyun/viapi-admin-web-front/src/containers/PopApiCheck/index.js
/Users/shaogucheng/Desktop/code/work/aliyun/viapi-admin-web-front/src/containers/SceneMgt/ScenceCreate/index.js
/Users/shaogucheng/Desktop/code/work/aliyun/viapi-admin-web-front/src/routes/ChangeOption/index.js
```
/** eslint-disable */
### This line has a length of 93. Maximum allowed is 80
顾名思义，该warning是由于一行代码过长导致的。

``` js
```

### Expected '===' and instead saw '=='
使用严格等于号

``` js
// bad
12 == '12'
// good
12 === '12'
```

### Assignment to property of function parameter 'xxxx'
禁止对函数参数再赋值 (no-param-reassign)
对函数参数中的变量进行赋值可能会误导读者，导致混乱，也会改变 arguments 对象。通常，对函数参数进行赋值并非有意为之，更多的是程序员的书写错误做成的。

当函数参数被修改时，该规则也可能会失效。由此造成的副作用可能导致不直观的执行流程，使错误难以跟踪。

``` js
// bad
function foo(bar) {
  bar = 13;
}

function foo(bar) {
  bar++;
}

function foo(bar) {
  bar.prop = "value";
}

function foo(bar) {
  delete bar.aaa;
}

function foo(bar) {
  bar.aaa++;
}
// good
function foo(bar) {
  var baz = bar;
}

```

### 'xxxx' is missing in props validation


### Newline required at end of file but not found
在非空文件中存在拖尾换行是一个常见的 UNIX 风格。它的好处同输出文件到终端一样，方便在串联和追加文件时不会打断 shell 的提示。

### Prefer default export  import/prefer-default-export

### Use object destructuring

### The body of a for-in should be wrapped in an if statement to filter unwanted properties from the prototype

``` js
for (key in foo) {    /*error The body of a for-in should be wrapped in an if statement to filter unwanted properties from the prototype.*/
  doSomething(key);
}

for (key in foo) {
  if ({}.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```

### Using target="_blank" without rel="noreferrer" is a security risk: see https://html.spec.whatwg.org/multipage/links.html#link-type-noopener

### Do not use setState in componentDidMount

### JSX props should not use .bind()
