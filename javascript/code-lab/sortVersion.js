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