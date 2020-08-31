function subarraysDivByK(nums) {
  const len = nums.length

  const newArray = nums.sort()
  let maxIndex = null
  const result = []
  for (let i = 0; i < len; i++) {
    const temp = [newArray[i]]
    console.info('temp', temp)
    for (let j = 0; j < len; j++) {
      if (temp.includes(newArray[j])) {
        continue
      }
      if (check(temp, newArray[j])) {
        temp.push(newArray[j])
      }
    }
    console.info(temp)
    result.push(temp)
    if (maxIndex !== null) {
      if (temp.length > result[maxIndex].length) {
        maxIndex = result.length - 1
      }
    } else {
      maxIndex = result.length - 1
    }
    console.info('maxIndex', maxIndex)
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

// const nums = [1, 2, 4, 6, 9, 3]
const nums = [1, 2, 3]

console.info(subarraysDivByK(nums))