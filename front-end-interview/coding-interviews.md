# 剑指 offer

## 剑指 Offer 03. 数组中重复的数字

在一个长度为 n 的数组 nums 里的所有数字都在 0 ～ n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

```js
var findRepeatNumber = function (nums) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return nums[i];
      break;
    }
    set.add(nums[i]);
  }
};

const arr = [2, 3, 1, 0, 2, 5, 3];

console.info(findRepeatNumber(arr));
```

## 剑指 Offer 04. 二维数组中的查找

在一个 n \* m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

```js
// const matrix = [
//   [1, 4, 7, 11, 15],
//   [2, 5, 8, 12, 19],
//   [3, 6, 9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30],
// ];

const matrix = [[-5]];

var findNumberIn2DArray = function (matrix, target) {
  for (let i = 0; i < matrix.length; i++) {
    const el = matrix[i];
    if (el[el.length - 1] >= target) {
      if (arrayFind(el, target)) {
        return true;
      } else {
        continue;
      }
    } else {
      continue;
    }
  }
  return false;
};

function arrayFind(arr, target) {
  let left = 0,
    right = arr.length - 1,
    mid;
  while (left <= right) {
    mid = left + ((right - left) >> 1);
    if (arr[mid] > target) {
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      return true;
    }
  }
  return false;
}

console.info(matrixFind(matrix, -5));

function findNumberIn2DArray(matrix, target) {
  if (matrix === null || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }
  const rows = matrix.length,
    columns = matrix[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (matrix[i][j] === target) {
        return true;
      }
    }
  }
  return false;
}
```

## 剑指 Offer 05. 替换空格

```js
var replaceSpace = function (s) {
  return s.replaceAll(' ', '%20');
};

var replaceSpace = function (s) {
  if (typeof s == 'string' && s.length >= 0 && s.length <= 10000) {
    return s.split(' ').join('%20');
  }
  return '';
};
```

## 剑指 Offer 06. 从尾到头打印链表

```js
var reversePrint = function (head) {
  const arr = [];
  let curr = head;
  while (curr) {
    arr.unshift(curr.val);
    curr = curr.next;
  }
  return arr;
};
```

## 剑指 Offer 07. 重建二叉树

输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字

```js

```

## 剑指 Offer 09. 用两个栈实现队列

```js
var CQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  if (this.stack1.length) {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop());
    }
    this.stack1.push(val);
    while (this.stack2.length) {
      this.stack1.push(this.stack2.pop());
    }
  } else {
    this.stack1.push(val);
  }
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.stack1.length) {
    return this.stack1.pop();
  } else {
    return -1;
  }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */

class Stack {
  constructor(stack = []) {
    this.stack = stack;
  }

  push(val) {
    this.stack.push(val);
  }
  pop() {
    return this.stack.pop();
  }
}

class Queue {
  constructor(queue = []) {
    this.queue = queue;
  }

  add(val) {
    this.queue.push(val);
  }
  push() {
    return this.queue.shift();
  }
}
```

## 剑指 Offer 10- I. 斐波那契数列

```js
var fib = function (n) {
  if (n <= 1) return n;
  if (n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
};

function fib(n, a = 1, b = 1) {
  if (n <= 1) return n;
  if (n == 2) return b;
  return fib(n - 1, b, (a + b) % 1000000007);
}
```

## 剑指 Offer 10- II. 青蛙跳台阶问题

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

```js
var numWays = function (n) {
  let cache = new Array(n + 1).fill(-1);
  cache[0] = cache[1] = 1;
  cache[2] = 2;
  for (let i = 3; i <= n; i++) {
    cache[i] = (cache[i - 1] + cache[i - 2]) % 1000000007;
  }
  return cache[n];
};
```

## Offer 11. 旋转数组的最小数字

```js
var minArray = function (numbers) {
  for (let i = 1; i < numbers.length; i++) {
    console.info(i);
    if (numbers[i - 1] > numbers[i]) {
      return numbers[i];
      break;
    }
  }
  return numbers[0];
};
```

## 剑指 Offer 12. 矩阵中的路径

## 剑指 Offer 16. 数值的整数次方

```js
var result = 1;
if (n === 0) return 1;
if (n === 1) return x;
if (n < 0) return 1 / myPow(x, -n);
// n > 1
if (n % 2 === 1) {
  // n 奇数
  result = x * myPow(x, n - 1);
} else {
  // n 偶数
  result = myPow(x, n / 2);
  result *= result;
}
return result;
```
