function subarraysDivByK(nums) {
  const len = nums.length

  const newArray = nums.sort()
  let maxIndex = null
  const result = []
  for (let i = 0; i < len; i++) {
    const temp = [newArray[i]]
    for (let j = 0; j < len; j++) {
      if (temp.includes(newArray[j])) {
        continue
      }
      if (check(temp, newArray[j])) {
        temp.push(newArray[j])
      }
    }
    result.push(temp)
    if (maxIndex !== null) {
      if (temp.length > result[maxIndex].length) {
        maxIndex = result.length - 1
      }
    } else {
      maxIndex = result.length - 1
    }
  }

  return result[maxIndex]
}

function check(array, nums) {
  if (nums === 1) return true
  for (let i = 0; i < array.length; i++) {
    if (nums % array[i] !== 0) {
      return false
    }
  }
  return true
}

const nums = [1, 2, 4, 6, 9, 3]
const nums = [2, 4, 5, 15, 75]


function sortVersion(arr) {
  var len = arr.length;
  if (len < 2) {
    return arr;
  }
  var middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(sortVersion(left), sortVersion(right));
}

function merge(left, right) {
  var result = [];

  while (left.length > 0 && right.length > 0) {
    if (compare(left[0], right[0])) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length)
    result.push(left.shift());

  while (right.length)
    result.push(right.shift());

  return result;
}

function compare(a, b) {
  const aStr = a.split('.')
  const bStr = b.split('.')
  while (aStr.length > 0 && bStr.length > 0) {
    const num1 = parseInt(aStr.shift())
    const num2 = parseInt(bStr.shift())
    if (num1 === num2) {
      continue
    }
    if (num1 < num2) {
      return true
    } else if (num1 > num2) {
      return false
    }
  }
  return false
}

const versions = ['1.0.0', '2.12.1', '1.2.3.4.5.6.7', '0.18.1']

console.info(sortVersion(versions))


class Depository {
  constructor(options) {

  }

  transferIn(cargo) {

  }

  transferOut(userId) {

  }
}