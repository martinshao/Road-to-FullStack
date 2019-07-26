/**************************解法一 *********************************/
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let ans = "";
  let max = 0;
  let len = s.length;
  for (let i = 0; i < len; i++)
    for (let j = i + 1; j <= len; j++) {
      let test = s.substring(i, j);
      if (isPalindromic(test) && test.length > max) {
        ans = s.substring(i, j);
        max = Math.max(max, ans.length);
      }
    }
  return ans;
};

var isPalindromic = function (s) {
  let len = s.length;
  for (let i = 0; i < len / 2; i++) {
    if (s.charAt(i) != s.charAt(len - i - 1)) {
      return false;
    }
  }
  return true;
}

/**************************解法一 *********************************/

/**************************解法二*********************************/
var longestPalindrome = function (s) {
  let set = new Set();
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 2; j <= s.length; j++) {
      let current = s.substring(i, j);
      if (current === Array.from(current).reverse().join('')) {
        set.add(current)
      }
    }
  }

  if (set.size === 0) {
    if (s.length > 0)
      return s.substring(1);
    else
      return s
  }

  const array = Array.from(set).sort((a, b) => b.length - a.length);

  return array[0];
};
/**************************解法二*********************************/

/**************************解法三*********************************/
let TDArray = function (len) {
  var tArray = new Array();
  for (var k = 0; k < len; k++) {
    tArray[k] = new Array();
    for (var j = 0; j < len; j++) {
      tArray[k][j] = ""; 
    }
  }
  return tArray;
}

let longestPalindrome = function (s) {
  let len = s.length;
  if (len <= 1) {
    return s;
  }
  let longestPalindrome = 1;
  let longestPalindromeStr = s.substring(0, 1);
  let dp = TDArray(len, len)

  for (let r = 1; r < len; r++) {
    for (let l = 0; l < r; l++) {

      if (s.charAt(l) == s.charAt(r) && (r - l <= 2 || dp[l + 1][r - 1])) {
        dp[l][r] = true;
        if (r - l + 1 > longestPalindrome) {
          longestPalindrome = r - l + 1;
          longestPalindromeStr = s.substring(l, r + 1);
        }
      }
    }
  }
  return longestPalindromeStr;
}
/**************************解法三*********************************/

/**************************解法四*********************************/
var longestPalindrome = function(s) {
  let len = s.length;
  let result;
  let i,j,L;
  let dp=Array(len).fill(0).map(x=>Array(len).fill(0));
  //console.log(dp);
  if(len<=1){
      return s
  }
  // 只有一个字符的情况是回文
  for(i = 0;i<len;i++){
      dp[i][i] = 1
      result = s[i]
  }

  // L是i和j之间的间隔数（因为间隔数从小到大渐增，所以大的间隔数总能包含小的间隔数）
  // i     j
  // abcdcba.length = L   所以 L = j-i+1; => j = i+L-1;
  for ( L = 2; L <= len; L++) {
      // 从0开始
      for ( i = 0; i <= len - L; i++) {
              j = i + L - 1;
          if(L == 2 && s[i] == s[j]) {
              dp[i][j] = 1;
              result = s.slice(i, i + L);
          }else if(s[i] == s[j] && dp[i + 1][j - 1] == 1) {
              dp[i][j] = 1
              result = s.slice(i, i + L);
          }

      }
  }
  //console.log(result);
  return result;
}
/**************************解法四*********************************/