/**
 * 
 * @param {*} nums 
 * @param {*} target 
 */
function twoSum(nums, target) {
  var len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    for (var j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j]
      }
    }
    return [];
  }
}

const nums = [1, 7, 11, 15, 2, 3, 1, 7, 3, 6, 8];
const target = 9

console.info(twoSum(nums, target));