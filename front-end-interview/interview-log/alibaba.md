# alibaba 面试总结

## 笔试题

### 颠倒整数

给定一个 32 位有符号整数，将整数中的数字进行反转。

```js
输入: 123;
输出: 321;

输入: -123;
输出: -321;

输入: 120;
输出: 21;
```

```js
// method 1
function convertNum(x) {
  if (!x) return 0;
  let positive = x > 0 ? true : false;
  x = x > 0 ? x : -x;
  let res = 0;
  while (x) {
    res = res * 10 + (x % 10);
    if (positive) {
      if (res > Math.pow(2, 31) - 1) return 0;
    } else {
      if (res > Math.pow(2, 31)) return 0;
    }
    x = parseInt(x / 10);
  }
  return positive ? res : -res;
}

// method 2
function convertNum(number) {
  if (number > 0) {
    return reverse(number);
  } else if (number < 0) {
    return -reverse(-number);
  }

  return 0;

  function reverse(number) {
    const strArr = number.toString().split('').reverse();
    return parseInt(strArr.join(''));
  }
}
```

### 对象扁平化

请使用 JavaScript 实现名为 flatten(input) 的函数，可以将传入的 input 对象（Object 或者 Array）进行扁平化处理并返回结果。具体效果如下：

```js
const input = {
a: 1,
b: [ 1, 2, { c: true }, [ 3 ] ],
d: { e: 2, f: 3 },
g: null,
}
// 输出
{
"a": 1,
"b[0]": 1,
"b[1]": 2,
"b[2].c": true,
"b[3][0]": 3,
"d.e": 2,
"d.f": 3,
// "g": null, 值为null或者undefined，丢弃
};
```

```js
function flatten(input) {
  let result = {};

  const toString = (obj) => Object.prototype.toString.call(obj);
  const isObject = (obj) => toString(obj) === '[object Object]';
  const isArray = (obj) => toString(obj) === '[object Array]';

  const arrayKey = (preKey, key) => `${preKey}[${key}]`;
  const objectKey = (preKey, key) => `${preKey}.${key}`;

  function flat(preKey, ipt) {
    if (ipt) {
      let temp = {};
      if (isObject(ipt)) {
        for (let key in ipt) {
          temp = Object.assign(temp, flat(objectKey(preKey, key), ipt[key]));
        }
      } else if (isArray(ipt)) {
        for (let key in ipt) {
          temp = Object.assign(temp, flat(arrayKey(preKey, key), ipt[key]));
        }
      } else {
        temp[preKey] = ipt;
      }
      return temp;
    }
  }

  for (let key in input) {
    result = Object.assign(result, flat(key, input[key]));
  }
  return result;
}
```

### 组合总和

给定一个无重复元素的数组  candidates  和一个目标数  target ，找出  candidates  中所有可以使数字和为  target  的组合。

candidates  中的数字可以无限制重复被选取。

说明：

1. 所有数字（包括  target）都是正整数。
2. 解集不能包含重复的组合。

```js
输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]

输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

### 找交集元素

找出连个数组相同的元素（交集），返回新数组，新数组的元素不能重复

```js
[1,2,3,4,3,4][3,4,5] => [3,4]
```

### 实现 Array.prototype.map 方法 (polyfill)

### 实现一个 LazyMan

```js
实现一个 HelloMan ，可以按照以下方式调用:
HelloMan("Hank")输出:
Hi! This is Hank!

HelloMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

HelloMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~

HelloMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。
```

### 实现对象的深拷贝的方法

### 实现一个eventBus方法

### 获取一个数字数组中的最大值

```js
input: [1,5,3,9,2,7]
output: 9
```

### 多维数组拍平至一维数组

```js
input:
[
  1,
  [2, '3'],
  {name: '数组'},
  false,
  ['a[b]c', 'd,e,f', [[4]]],
  [{g: 5}]
]

output:
[
  1,2,'3',
  {name: '数组'},
  false,
  'a[b]c',
  'd,e,f',
  4,
  {g: 5}
]
```

### 函数柯里化

函数 add(a,b)可以返回a与b之和，请求add函数，是的add(a)(b)得到相同的结果

### 反转链表

### 爬楼梯算法题

### 二叉树镜像判断

### 二叉树路径和判断

输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。