function search_first_larger_k(arr, target) {
  let low = 0,
    mid = null,
    high = arr.length - 1;

  while (low <= high) {
    mid = Math.floor((high - low) / 2 + low);
    if (target < arr[mid]) {
      high = mid - 1;
    } else if (target > arr[mid]) {
      low = mid + 1;
    } else {
      while (mid <= arr.length - 1 && arr[mid] == arr[mid + 1]) {
        ++mid;
      }
      return mid;
    }
  }
  return -1;
}

const arr = [1, 2, 3, 4, 5, 8, 8, 8, 9, 10];
const target = 8;

console.info(search_first_larger_k(arr, target));
