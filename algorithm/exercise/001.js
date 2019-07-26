
const nums = [2, 7, 11, 15], target = 9;

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
      const start = nums[i];
      for (let j = i+1; j < nums.length; j++) {
        const end = nums[j];
        if (start + end === target) {
          return [i, j]
        }
      }
    }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
      const value = map.get(nums[i]);
      if(value !== undefined) {
        return [value, i];
      }
      map.set(target-nums[i], i);
    }
    return false;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if(map.has(nums[i])) {
      return [map.get(nums[i]), i];
    }
    map.set(target-nums[i], i);
  }
  return false;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }

  for (const [key, value] of map) {
    if (map.has(target - key) && map.get(target-value) !== i) {
      return [map.get(target - key), value]
    }
  }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const other = target - nums[i];
    const otherInx = nums.lastIndexOf(other);
    if (otherInx !== -1 && 1 !== otherInx) {
      return [i, otherIndex];
    }
  }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const a = [];
  for (let i = 0; i < nums.length; i++) {
    const tmp = target - nums[i];
    if (a[tmp] !== underfined) {
      return [a[tmp], i]
    }
    a[num[i]] = i;
  }
};