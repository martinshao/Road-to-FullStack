
let mzArray = [
  [0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0],
  [1, 1, 1, 0, 0],
  [0, 1, 0, 0, 1],
  [0, 1, 0, 0, 0],
];

const path = []
const current = null

// let m = mzArray.length;
// let n = mzArray[0].length;

// 二维数组 数组的长度是 行数 第一个数组的长度是列数

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  let depth = 0;
  // 是一个正方形
  let m = grid.length - 1;
  let n = grid[0].length - 1
  // 边界情况，如果开头或结尾是1的情况下，不论怎么走都不可能达到题目要求
  if (grid[0][0] == 1 || grid[m][n] == 1) return -1;
  // 如果只有一个元素的情况
  if (m == 0 && n === 0) return 1;
  let queue = [[0, 0]];
  // 走过的路都标记为1  因为在BFS里面也只会去走为0的路
  grid[0][0] = 1;
  let directions = [
    // 垂直向上
    [0, -1],
    // 垂直向下
    [0, 1],
    // 向左
    [-1, 0],
    // 向右
    [1, 0]
  ];
  while (queue.length) {
    depth++;
    let size = queue.length;
    // 这样写比较简单
    while (size--) {
      let [x, y] = queue.shift();
      // 走到了终点
      if (x == m && y == n) return depth;
      for (let dir of directions) {
        let curX = x + dir[0],
          curY = y + dir[1];
        // 超出边界或者已经访问过了
        if (
          curX > m ||
          curY > n ||
          curX < 0 ||
          curY < 0 ||
          grid[curX][curY] == 1
        ) {
          continue;
        }
        path.push([x, y])
        queue.push([curX, curY]);
        grid[curX][curY] = 1;
      }
    }
  }
  // 这里应该是-1  而不是depth 因为如果上面走通了上面就返回了  只有走不通没返回才到这里
  return -1;
};

console.info(shortestPathBinaryMatrix(mzArray))
