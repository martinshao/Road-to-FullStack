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
