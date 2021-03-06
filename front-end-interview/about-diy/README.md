# JavaScript 手写题总结

## JavaScript 必知必会基础题

### 1. 去重

使用 Set

```js
const delDuplicate = (arr) => Array.from(new Set(arr));
```

两层 for 循环+splice

```js
const delDuplicate = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        len--;
        j--;
      }
    }
  }
  return arr;
};
```

### 2. 数组扁平化

使用 Array.prototype.flat()

```js
const flatten = (arr) => arr.flat(Infinite);
```

使用 reduce

```js
const flatten = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
};
```

函数递归

```js
const flatten = arr => {
  const res = []
  const fn = arr => {
    for(let i = 0; i < arr.length; i++) {
      fn(arr[i])
    } else {
      res.push(arr[i])
    }
  }
  return fn(arr)
}
```

### 3. 防抖

```js
function debounce(fn, delay = 100) {
  let timeout = null;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### 4. 节流

```js
function throttle(fn, delay = 100) {
  let flag = false;
  return function (...args) {
    if (flag) return;
    flag = true;
    setTimeout(() => {
      fn.apply(this, args);
      flag = false;
    }, delay);
  };
}
```

### 5. new 实现

```js
function newOpt(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new TypeError('Type Error');
  }
  const obj = Object.create(ctor.prototype);
  const res = ctor.apply(obj, args);

  const isObject = typeof res === 'object' && res !== null;
  const isFunction = typeof res === 'function';
  return isObject || isFunction ? res : obj;
}
```

### 6. instanceof 实现

```js
function myInstanceof(l, r) {
  let proto = l.__proto__;
  let prototype = r.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}
```

### 7. call 实现

```js
Function.prototype.myCall = function (context = globalThis) {
  const key = Symbol('key');
  context[key] = this;
  const args = [...arguments].slice(1);
  const res = context[key](...args);
  delete context[key];
  return res;
};

// test
const jack = {
  name: 'Jack',
};

function say() {
  console.info(`My name is ${this.name || 'default'}`);
}

say.myCall(jack);
```

### 8. apply 实现

```js
Function.prototype.myApply = function (context = globalThis) {
  const key = Symbol('key');
  context[key] = this;
  let res;
  if (arguments[1]) {
    res = context[key](...arguments[1]);
  } else {
    res = context[key]();
  }
  delete context[key];
  return res;
};

// test
const jack = {
  name: 'Jack',
};

function say() {
  console.info(`My name is ${this.name || 'default'}`);
}

say.myApply(jack);
```

### 9. bind 实现

```js
Function.prototype.myBind = function (context = globalThis) {
  const fn = this;
  const args = Array.from(arguments).slice(1);
  const newFunc = function () {
    const newArgs = args.concat(...arguments);
    if (this instanceof newFunc) {
      fn.apply(this, newArgs);
    } else {
      fn.apply(context, newArgs);
    }
  };
  newFunc.prototype = Object.create(fn.prototype);
  return newFunc;
};

// test
const me = { name: 'Jack' };
const other = { name: 'Jackson' };
function say() {
  console.log(`My name is ${this.name || 'default'}`);
}
const meSay = say.myBind(me);
meSay();
const otherSay = say.myBind(other);
otherSay();

// MDN 实现
//  Yes, it does work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind)
  (function () {
    var ArrayPrototypeSlice = Array.prototype.slice;
    Function.prototype.bind = function (otherThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError(
          'Function.prototype.bind - what is trying to be bound is not callable'
        );
      }

      var baseArgs = ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          baseArgs.push.apply(baseArgs, arguments);
          return fToBind.apply(
            fNOP.prototype.isPrototypeOf(this) ? this : otherThis,
            baseArgs
          );
        };

      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();

      return fBound;
    };
  })();
```

### 10. 深拷贝

简单版本：

```js
const newObj = (obj) => JSON.parse(JSON.stringigy(obj));
```

> 简单版本实现的局限：
>
> 1. 无法实现对函数、RegExp 等特殊对象的克隆
> 2. 会抛弃对象的 constructor，所有的构造函数会指向 Object
> 3. 对象有循环引用，会报错

面试版本:

```js
const clone = (parent) => {
  // 判断类型
  const isType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
      case 'Array':
        flag = typeString === '[object Array]';
        break;
      case 'Date':
        flag = typeString === '[object Date]';
        break;
      case 'RegExp':
        flag = typeString === '[object RegExp]';
        breakl;
      default:
        flag = false;
    }
    return flag;
  };

  // 处理正则
  const getRegExp = (re) => {
    let flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  };

  // 判断是否对象
  const isObject = (obj) => typeof obj === 'object';

  const parents = [];
  const children = [];

  const _clone = (parent) => {
    if (parent === null) return null;
    if (!isObject(parent)) return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      child = [];
    } else if (isType(parent, 'RegExp')) {
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      child = new Date(parent.getTime());
    } else {
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto);
    }

    const index = parents.indexOf(parent);

    if (idnex != -1) {
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (const key in parent) {
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};
```

### 11. 柯里化

```js
function curry(fn) {
  return (...xs) => {
    if (xs.length === fn.length) {
      throw new Error('ENTRY INVOCATION');
    }
    if (xs.length >= fn.length) {
      return fn(...xs);
    }

    return curry(fn.bind(null, ...xs));
  };
}
```

## JavaScript 中设计模式

### 手写 eventBus

> 发布订阅的核心: 每次 event. emit（发布），就会触发一次 event. on（注册）

这一种是我认为相当简洁和经典的

```js
class EventBus {
  constructor() {
    this.subscription = {};
  }

  subscribe(eventType, callback) {
    const id = Symbol('id');
    if (!this.subscription[eventType]) this.subscription[eventType] = {};
    this.subscription[eventType][id] = callback;
    return {
      unsubscribe: function unsubsribe() {
        console.info(this.subscription);
        delete this.subscription[eventType][id];
        if (!Object.getOwnPropertySymbols(this.subscription[eventType]).length) {
          delete this.subscription[eventType];
        }
      }.bind(this),
    };
  }

  publish(eventType, arg) {
    if (!this.subscription[eventType]) return;

    Object.getOwnPropertySymbols(this.subscription[eventType]).forEach((key) =>
      this.subscription[eventType][key](arg)
    );
  }
}

const eventBus = new EventBus();

const subscription = eventBus.subscribe('event', (arg) => console.log(arg));
eventBus.publish('event', 'message');
eventBus.publish('event', 'hello world');
console.info(subscription);
subscription.unsubscribe();
eventBus.publish('event', 'hello world');
```

### vue reactive

## 异步相关手写

### 1. 实现 Promise

```js
var PromisePolyfill = (function () {
  // 和reject不同的是resolve需要尝试展开thenable对象
  function tryToResolve(value) {
    if (this === value) {
      // 主要是防止下面这种情况
      // let y = new Promise(res => setTimeout(res(y)))
      throw TypeError('Chaining cycle detected for promise!');
    }

    // 根据规范2.32以及2.33 对对象或者函数尝试展开
    // 保证S6之前的 polyfill 也能和ES6的原生promise混用
    if (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function')
    ) {
      try {
        // 这里记录这次then的值同时要被try包裹
        // 主要原因是 then 可能是一个getter, 也也就是说
        //   1. value.then可能报错
        //   2. value.then可能产生副作用(例如多次执行可能结果不同)
        var then = value.then;

        // 另一方面, 由于无法保证 then 确实会像预期的那样只调用一个onFullfilled / onRejected
        // 所以增加了一个flag来防止resolveOrReject被多次调用
        var thenAlreadyCalledOrThrow = false;
        if (typeof then === 'function') {
          // 是thenable 那么尝试展开
          // 并且在该thenable状态改变之前this对象的状态不变
          then.bind(value)(
            // onFullfilled
            function (value2) {
              if (thenAlreadyCalledOrThrow) return;
              thenAlreadyCalledOrThrow = true;
              tryToResolve.bind(this, value2)();
            }.bind(this),

            // onRejected
            function (reason2) {
              if (thenAlreadyCalledOrThrow) return;
              thenAlreadyCalledOrThrow = true;
              resolveOrReject.bind(this, 'rejected', reason2)();
            }.bind(this)
          );
        } else {
          // 拥有then 但是then不是一个函数 所以也不是thenable
          resolveOrReject.bind(this, 'resolved', value)();
        }
      } catch (e) {
        if (thenAlreadyCalledOrThrow) return;
        thenAlreadyCalledOrThrow = true;
        resolveOrReject.bind(this, 'rejected', e)();
      }
    } else {
      // 基本类型 直接返回
      resolveOrReject.bind(this, 'resolved', value)();
    }
  }

  function resolveOrReject(status, data) {
    if (this.status !== 'pending') return;
    this.status = status;
    this.data = data;
    if (status === 'resolved') {
      for (var i = 0; i < this.resolveList.length; ++i) {
        this.resolveList[i]();
      }
    } else {
      for (i = 0; i < this.rejectList.length; ++i) {
        this.rejectList[i]();
      }
    }
  }

  function Promise(executor) {
    if (!(this instanceof Promise)) {
      throw Error('Promise can not be called without new !');
    }

    if (typeof executor !== 'function') {
      // 非标准 但与Chrome谷歌保持一致
      throw TypeError('Promise resolver ' + executor + ' is not a function');
    }

    this.status = 'pending';
    this.resolveList = [];
    this.rejectList = [];

    try {
      executor(tryToResolve.bind(this), resolveOrReject.bind(this, 'rejected'));
    } catch (e) {
      resolveOrReject.bind(this, 'rejected', e)();
    }
  }

  Promise.prototype.then = function (onFullfilled, onRejected) {
    // 返回值穿透以及错误穿透, 注意错误穿透用的是throw而不是return，否则的话
    // 这个then返回的promise状态将变成resolved即接下来的then中的onFullfilled
    // 会被调用, 然而我们想要调用的是onRejected
    if (typeof onFullfilled !== 'function') {
      onFullfilled = function (data) {
        return data;
      };
    }
    if (typeof onRejected !== 'function') {
      onRejected = function (reason) {
        throw reason;
      };
    }

    var executor = function (resolve, reject) {
      setTimeout(
        function () {
          try {
            // 拿到对应的handle函数处理this.data
            // 并以此为依据解析这个新的Promise
            var value =
              this.status === 'resolved'
                ? onFullfilled(this.data)
                : onRejected(this.data);
            resolve(value);
          } catch (e) {
            reject(e);
          }
        }.bind(this)
      );
    };

    // then 接受两个函数返回一个新的Promise
    // then 自身的执行永远异步与onFullfilled/onRejected的执行
    if (this.status !== 'pending') {
      return new Promise(executor.bind(this));
    } else {
      // pending
      return new Promise(
        function (resolve, reject) {
          this.resolveList.push(executor.bind(this, resolve, reject));
          this.rejectList.push(executor.bind(this, resolve, reject));
        }.bind(this)
      );
    }
  };

  // for prmise A+ test
  Promise.deferred = Promise.defer = function () {
    var dfd = {};
    dfd.promise = new Promise(function (resolve, reject) {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  };

  // for prmise A+ test
  if (typeof module !== 'undefined') {
    module.exports = Promise;
  }

  return Promise;
})();

PromisePolyfill.all = function (promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let cnt = 0;
    for (let i = 0; i < promises.length; ++i) {
      promises[i].then((value) => {
        cnt++;
        result[i] = value;
        if (cnt === promises.length) resolve(result);
      }, reject);
    }
  });
};

PromisePolyfill.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; ++i) {
      promises[i].then(resolve, reject);
    }
  });
};
```

基于 Promise 封装 Ajax

- 返回一个新的 Promise 实例
- 创建 HMLHttpRequest 异步对象
- 调用 open 方法，打开 url，与服务器建立链接（发送前的一些处理）
- 监听 Ajax 状态信息
- 如果 xhr.readyState == 4（表示服务器响应完成，可以获取使用服务器的响应了）
  - xhr.status == 200，返回 resolve 状态
  - xhr.status == 404，返回 reject 状态
- xhr.readyState !== 4，把请求主体的信息基于 send 发送给服务器

```js
function ajax(url, method) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(url, method, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else if (xhr.status === 404) {
          reject(new Error('404'));
        }
      } else {
        reject('请求数据失败');
      }
    };
    xhr.send(null);
  });
}
```

手动实现 sleep

```js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log('Hello');
sleep(2000)
  .then(() => {
    console.log('World!');
  })
  .then(() => {
    sleep(2000).then(() => {
      console.log('Goodbye!');
    });
  });

async function delayedGreeting() {
  console.log('Hello');
  await sleep(2000);
  console.log('World!');
  await sleep(2000);
  console.log('Goodbye!');
}

delayedGreeting();

console.log('Hello');
setTimeout(() => {
  console.log('World!');
}, 2000);

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

console.log('Hello');
sleep(2000);
console.log('World!');
```

异步并发数限制

```js
/**
 * 关键点
 * 1. new promise 一经创建，立即执行
 * 2. 使用 Promise.resolve().then 可以把任务加到微任务队列，防止立即执行迭代方法
 * 3. 微任务处理过程中，产生的新的微任务，会在同一事件循环内，追加到微任务队列里
 * 4. 使用 race 在某个任务完成时，继续添加任务，保持任务按照最大并发数进行执行
 * 5. 任务完成后，需要从 doingTasks 中移出
 */
function limit(count, array, iterateFunc) {
  const tasks = [];
  const doingTasks = [];
  let i = 0;
  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve();
    }
    const task = Promise.resolve().then(() => iterateFunc(array[i++]));
    tasks.push(task);
    const doing = task.then(() =>
      doingTasks.splice(doingTasks.indexOf(doing), 1)
    );
    doingTasks.push(doing);
    const res =
      doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve();
    return res.then(enqueue);
  };
  return enqueue().then(() => Promise.all(tasks));
}

// test
const timeout = (i) =>
  new Promise((resolve) => setTimeout(() => resolve(i), i));
limit(2, [1000, 1000, 1000, 1000], timeout).then((res) => {
  console.log(res);
});
```

## JavaScript 正则

1、`var s1 = "get-element-by-id"`; 给定这样一个连字符串，写一个 `function` 转换为驼峰命名法形式的字符串 `getElementById`

```js
const f = function (s) {
  return s.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
};
```

2、判断字符串是否包含数字

```js
function containsNumber(str) {
  const regx = /\d/;
  return regx.text(str);
}
```

3、判断电话号码

```js
function isPhone(tel) {
  const regExp = /^1[34578]\d{9}$/;
  return regExp.test(tel);
}
```

4、判断是否符合指定格式

给定字符串 str，检查其是否符合如下格式

XXX-XXX-XXXX
其中 X 为 Number 类型

```js
function matchesPattern(str) {
  return /^(\d{3}-){2}\d{4}&/.test(str);
}
```

5、判断是否符合 USD 格式
给定字符串 str，检查其是否符合美元书写格式

以 $ 开始
整数部分，从个位起，满 3 个数字用 , 分隔
如果为小数，则小数部分长度为 2
正确的格式如：$1,023,032.03 或者 $2.03，错误的格式如：$3,432,12.12 或者 \$34,344.3\*\*

```js
function isUSD(str) {
  const regx = /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/;
  return regx.test(str);
}
```

6、JS 实现千位分隔符

```js
function format(number) {
  const regx = /\d{1,3}(?=(\d{3})+$)/g;
  return (number + '').replace(regx, '$&,');
}

function format(number) {
  const regx = /(?!^)(?=(\d{3})+$)/g;
  return number.replace(regx, ',');
}

function format(number) {
  const num = parseFloat(number.toFixed(3));
  let [] = String.prototype.split.call(number, '.');
  integer = integer.replace(/(?!^)(?=(\d{3})+$)/g, ',');
  return `${integer}.${decimal ? decimal : ''}`;
}
```

7、获取 url 参数

获取 url 中的参数

指定参数名称，返回该参数的值 或者 空字符串
不指定参数名称，返回全部的参数对象 或者 {}
如果存在多个同名参数，则返回数组

```js
function getUrlParam(url, key) {
  var arr = {};
  url.replace(/\??(\w+)=(\w+)&?/g, function (match, matchKey, matchValue) {
    if (!arr[matchKey]) {
      arr[matchKey] = matchValue;
    } else {
      var temp = arr[matchKey];
      arr[matchKey] = [].concat(temp, matchValue);
    }
  });
  if (!key) {
    return arr;
  } else {
    for (ele in arr) {
      if ((ele = key)) {
        return arr[ele];
      }
    }
    return '';
  }
}
```

8、验证邮箱

```js
function isEmail(email) {
  const regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
  return regx.test(email);
}
```

9、验证身份证号码
身份证号码可能为 15 位或 18 位，15 位为全数字，18 位中前 17 位为数字，最后一位为数字或者 X

```js
function isCardNo(number) {
  const regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return regx.test(number);
}
```

10、匹配汉字

```js
const regx = /^[\u4e00-\u9fa5]{0,}$/;
```

11、去除首尾的'/'

```js
const str = '/asdf//';
str = str.replace(/^\/*|\/*$/g, '');
```

12、判断日期格式是否符合 '2017-05-11'的形式，简单判断，只判断格式

```js
const regx = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
```

13、判断日期格式是否符合 '2017-05-11'的形式，严格判断（比较复杂）

```js
const regx = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
```

14、IPv4 地址正则

```js
const regx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
```

15、十六进制颜色正则

```js
const regx = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
```

16、车牌号正则

```js
const regx = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
```

17、过滤 HTML 标签

```js
const str = '<p>dasdsa</p>nice <br> test</br>';
const regx = /<[^<>]+>/g;
str = str.replace(regx, '');
```

18、密码强度正则，最少 6 位，包括至少 1 个大写字母，1 个小写字母，1 个数字，1 个特殊字符

```js
const regx = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
```

19、URL 正则

```js
const regx = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
```

20、匹配浮点数

```js
const regx = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
```

21、<OPTION value="待处理">待处理</OPTION>

写一个正则表达式,匹配 "<OPTION value="待处理">"

```js
const str = '<OPTION value="待处理">待处理</OPTION>';
const regx = /^<.*?>/;
const resiult = regx.exec(str)[0];
```

最后推荐一个练习正则的网站 [regulex](https://jex.im/regulex/) ，可以查看正则匹配的走向。
掘金一个简单版的正则教程[JS 正则表达式完整教程](https://juejin.im/post/6844903487155732494)

## 参考资料

- [2020 斩获 30 道高频 JS 手撕面试题](https://juejin.im/post/6870319532955828231)
- [22 道高频 JavaScript 手写面试题及答案](https://juejin.im/post/6844903911686406158)
- [32 个手写 JS，巩固你的 JS 基础](https://juejin.im/post/6875152247714480136)
- [前端面试常见的手写功能](https://juejin.im/post/6873513007037546510)
