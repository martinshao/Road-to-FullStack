const nums1 = [1, 2, 3, 0, 0, 0],
  m = 3
const nums2 = [2, 5, 6],
  n = 3

const nums1 = [0],
  m = 0
const nums2 = [1],
  n = 1

const nums1 = [4, 5, 6, 0, 0, 0]
m = 3
const nums2 = [1, 2, 3]
n = 3

var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, n, ...nums2)
  return nums1.sort((a, b) => a - b)
};

console.info(nums1, nums2)

var merge = function (nums1, m, nums2, n) {
  let len = m + n - 1
  let len1 = m - 1
  let len2 = n - 1

  while (len1 > 0 || len2 > 0) {
    if (nums1[len1] < nums2[len2]) {
      nums1[len] = nums2[len2]
      len2--
    } else {
      nums1[len] = nums1[len1]
      len1--
    }
    len--
  }
}

merge(nums1, m, nums2, n)

var merge = function (nums1, m, nums2, n) {
  let length = m + n
  while (n > 0) {
    if (m <= 0) {
      nums1[--length] = nums2[--n]
      continue
    }
    nums1[--length] = nums1[m - 1] >= nums2[n - 1] ? nums1[--m] : nums2[--n]
  }
};

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let len1 = m - 1;
  let len2 = n - 1;
  let len = m + n - 1;

  while (len2 >= 0) {
    if (len1 < 0) {
      nums1[len--] = nums2[len2--];
      continue;
    }
    nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
  }
};