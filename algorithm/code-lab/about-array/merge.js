
const nums1 = [1, 2, 3, 0, 0, 0], m = 3
const nums2 = [2, 5, 6], n = 3

var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, n, ...nums2)
  return nums1.sort((a, b) => a - b)
};

console.info(nums1, nums2)