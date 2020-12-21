var myPow = function (x, n) {
  if (n === 0) return 1;
  if (n < 0) return (1 / x) * myPow(1 / x, -n - 1);
  return n % 2 === 0 ? myPow(x * x, n / 2) : x * myPow(x * x, n / 2);
};

console.info(myPow(2, 4))

var myPow = function(x, n) {
  const isNegative = n < 0; // 是否是负指数
  const result = absMyPow(x, Math.abs(n));
  return isNegative ? 1 / result : result;
};

function absMyPow(base, exponent) {
  if (exponent === 0) {
      return 1;
  }

  if (exponent === 1) {
      return base;
  }

  const subResult = absMyPow(base, Math.floor(exponent / 2));
  return exponent % 2 ? subResult * subResult * base : subResult * subResult;
}
