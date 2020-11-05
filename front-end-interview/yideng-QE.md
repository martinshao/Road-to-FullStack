## 题目 64

浏览器为什么要阻止跨域请求？如何解决跨域？每次跨越请求都需要到达服务端吗？浏览器端怎么拦截跨越请求的发出(是发出，不是接收)?

首先，什么是浏览器的跨域？

跨域是针对浏览器的“同源策略”提出的说法。之所以有“同源策略”这种模式是基于网络安全方面的考虑。所谓的同源策略关注三点：

1. 协议 (http:www.baidu.com & https.www.baidu.com http 协议不同，跨域)
2. 域名 (https://www.aliyun.com & https://developer.aliyun.com 域名不同，跨域)
3. 端口 (http://localhost:8080 & http://localhost:8000 端口号不同，跨域)

其次那些是哪些网络资源涉及到跨越？

“同源策略”对于跨域网络资源的设定非常的清晰。

这些场景涉及到跨域禁止操作：

1. 无法获取非同源网页的 cookie、localstorage 和 indexedDB。
2. 无法访问非同源网页的 DOM （iframe）。
3. 无法向非同源地址发送 AJAX 请求 或 fetch 请求（可以发送，但浏览器拒绝接受响应）。

为什么要阻止跨域呢？上文我们说过是基于安全策略：比如一个恶意网站的页面通过 iframe 嵌入了银行的登录页面（二者不同源），如果没有同源限制，恶意网页上的 javascript 脚本就可以在用户登录银行的时候获取用户名和密码。

最后一问是有问题的，关于跨域请求需要明确的一点是：每次需求都会发出，服务器端也会做出响应，只是浏览器端在接受响应的时候会基于同源策略进行拦截。

针对跨越问题我们该如何解决，主流的方案有以下：

1、 通过 jsonp 跨域
2、 document.domain + iframe 跨域
3、 location.hash + iframe
4、 window.name + iframe 跨域
5、 postMessage 跨域
6、 跨域资源共享（CORS）
7、 nginx 代理跨域
8、 nodejs 中间件代理跨域
9、 WebSocket 协议跨域

## 题目 68

实现一个函数，把 url 里的 querystring 转化为对象，希望考虑尽量多的边界情况。（没有 query，相同的 key，转义后的字符需要转回来）

```js
function querystring(queryStr) {
  const [, query] = queryStr.split('?');
  if (query) {
    return query.split('&').reduce((pre, cur) => {
      const [key, val] = cur.split('=');
      if (pre[key]) {
        pre[key] = [...pre[key], decodeURIComponent(val)];
      } else {
        pre[key] = [decodeURIComponent(val)];
      }
      return pre;
    }, {});
  }
  return {};
}
```

## 题目 66

实现一个函数 findLastIndex(), 返回指定数在“有序”数组中最后一次出现位置的索引 如 findLastIndex([1,2,3,3,3,4,5], 3), 返回 4。时间复杂度是多少？什么情况下时间复杂度最高？

类似这种题目，我们第一时间想到的就是二分查找法，然后对于重复数字的处理在用逼近方法，基本就可以得出答案了。时间复杂度时 O()=O(logn)。
如果用暴力法破解的化，时间复杂度将是 O()=O(n)。最复杂的情况是数组全部遍历之后才能得出最终结果。

```js
function lastTargetIndex(arr, target) {
  const len = arr.length;
  let left = 0,
    right = len - 1;

  while (true) {
    if (arr[left] > target || arr[right] < target) return -1;

    let middle = Math.floor((right - left) / 2 + left);
    if (arr[middle] === target) {
      left = middle;
    } else if (arr[middle] > target) {
      right = middle;
    } else {
      right = middle;
    }

    if (left + 1 === right && arr[right] === target) {
      return right;
    }

    if (left + 1 === right && arr[left] === target) {
      return left;
    }
  }
}
```

## 题目 77

WebWorker 的缺点是什么？在 worker 线程怎么获取主线程上下文？解决卡顿的问题除了使用 WebWorker 还有其他的解决方案吗？（面试中，建议了解下 fiber）有没有测试过 worker 通信时间？

Web Workers 存在一些显著的缺点，比如不能直接访问 Web 页面和 DOM API、消耗 CPU 周期且导致系统反应速度变慢。

主线程与 Worker 之间的通信内容，可以是文本，也可以是对象。需要注意的是，这种通信是拷贝关系，即是传值而不是传址，Worker 对通信内容的修改，不会影响到主线程。事实上，浏览器内部的运行机制是，先将通信内容串行化，然后把串行化后的字符串发给 Worker，后者再将它还原。

主线程与 Worker 之间也可以交换二进制数据，比如 File、Blob、ArrayBuffer 等类型，也可以在线程之间发送。下面是一个例子。

```js
// 主线程
var uInt8Array = new Uint8Array(new ArrayBuffer(10));
for (var i = 0; i < uInt8Array.length; ++i) {
  uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
}
worker.postMessage(uInt8Array);

// Worker 线程
self.onmessage = function (e) {
  var uInt8Array = e.data;
  postMessage(
    'Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString()
  );
  postMessage(
    'Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength
  );
};
```

但是，拷贝方式发送二进制数据，会造成性能问题。比如，主线程向 Worker 发送一个 500MB 文件，默认情况下浏览器会生成一个原文件的拷贝。为了解决这个问题，JavaScript 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面。这种转移数据的方法，叫做 Transferable Objects。这使得主线程可以快速把数据交给 Worker，对于影像处理、声音处理、3D 运算等就非常方便了，不会产生性能负担。

如果要直接转移数据的控制权，就要使用下面的写法。

```js
// Transferable Objects 格式
worker.postMessage(arrayBuffer, [arrayBuffer]);

// 例子
var ab = new ArrayBuffer(1);
worker.postMessage(ab, [ab]);
```

## 题目 94

完善下面函数，实现图片的加载

```js
function createImg(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    setTimeout(() => {
      resolve(img);
    }, 1000);
  });
}

createImg('1.jpg')
  .then(function (value) {
    document.body.appendChild(value);
    return createImg('2.jpg');
  })
  .then(function (value) {
    document.body.appendChild(value);
    return createImg('3.jpg');
  })
  .then(function (value) {
    document.body.appendChild(value);
  });
```

这个函数的作用应该是让图片有个延迟，依次加载图片的功能。但其实还可以有如下的优化。

```js
function createImg(url, delay) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    setTimeout(() => {
      document.body.appendChild(img);
      resolve();
    }, delay);
  });
}

createImg('1.jpg', 1000)
  .then(function () {
    return createImg('2.jpg', 2000);
  })
  .then(function () {
    return createImg('3.jpg', 3000);
  })
  .then(function () {});
```

## 题目 99

JavaScript 中函数继承主要继承的是什么？可以继承函数体吗？为什么？

首先要明白，JavaScript 语言设计之初就不是严格的面向对象语言。JavaScript 语言并不像 Java，C++那样有着严格的类和实例的声明和定义，反而是函数无处不在。而函数像程序本身一样，一个函数由称为函数体的一系列语句组成。

```js
function name([param[, param[, ... param]]]) { statements }
```

- name 函数名
- param 传递给函数的参数
- statement 组成函数体的声明语句

JavaScript 语言的继承体系的设计是来源于原型链，通过隐式原型、显式原型、构造函数等组成的原型链，来实现子类对父类属性和方法的继承。

通过下面两个经典的继承例子，我们可以很清晰的看到，JavaScript 的继承的主要是原型链，而不是函数体。

```js
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
  console.log(this.age);
};

const super1 = new SuperType('Rose');
const sub1 = new SubType('Martin', 12);
const sub2 = new SubType('Robot', 16);
```

这是经典是寄生组合式继承，通过继承显式原型和借用构造函数的方法，继承了父类的属性和方法，所以这肯定不是对于函数体的继承。

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }

  getColor() {
    console.info('This point color is', this.color);
  }
}

const p1 = new Point(1, 1);
const cp1 = new ColorPoint(2, 2, 'red');
const cp2 = new ColorPoint(3, 3, 'yellow');
```

这是 ES6 的继承实现，但是 ES6 的继承只是 ES5 继承的语法糖，底层的实现还是基于 ES5 的那一套。
