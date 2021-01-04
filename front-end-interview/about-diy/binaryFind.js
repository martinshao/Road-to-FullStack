const arr = [1, 2, 3, 5, 5, 5, 5, 5, 7, 8, 9];
const target = 5;

/**
 * @description 二分法的经典实现
 * @param {Array} arr 升序排序的数组
 * @param {Number} target 需要查找的目标数字
 */
function binaryFind(arr, target) {
  const len = arr.length;
  let left = 0,
    right = len - 1,
    middle;

  while (left <= right) {
    middle = left + Math.floor((right - left) / 2);
    if (arr[middle] > target) {
      right = middle - 1;
    } else if (arr[middle] < target) {
      left = middle + 1;
    } else {
      return middle;
    }
  }
  return -1;
}

// console.info(binaryFind(arr, target));

/**
 * mid = left + Math.floor((right - left) / 2); 的写法可以替换为
 * mid = left + ((right - left) >> 1) 这种写法就是用位运算的除以 2 写法，还能向下取整。
 */

function binarySearchLast(arr, target) {
  const len = arr.length;
  let left = 0,
    right = len - 1,
    mid;

  while (left <= right) {
    mid = left + ((left + right) >> 1);
    if (arr[mid] > target) {
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      while (mid <= len && arr[mid] === target) {
        ++mid;
      }
      return --mid;
    }
  }
  return -1;
}

console.info(binarySearchLast(arr, target));

function binarySearchFirst(arr, target) {
  const len = arr.length;
  let left = 0,
    right = len - 1,
    mid;

  while (left <= right) {
    mid = left + ((left + right) >> 1);
    if (arr[mid] > target) {
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      while (mid >= 0 && arr[mid] === target) {
        mid--;
      }
      return mid++;
    }
  }
  return -1;
}

/**
 * @description 计算x的n次幂函数
 * @param {float} x 一个数
 * @param {number} n 一个整数
 */
function myPow(x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;
  if (n === 2) return x * x;
  if (n < 0) return 1 / myPow(x, -n);
  if (n % 2) {
    return myPow(x, (n - 1) / 2) * myPow(x, (n - 1) / 2) * x;
  } else {
    return myPow(x, n / 2) * myPow(x, n / 2);
  }
}

console.info(myPow(2, 5));

var myPow = function (x, n) {
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
};
