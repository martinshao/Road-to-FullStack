/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    if (x === 0) {
        return x
    }
    if (x < Math.pow(-2, 31) || x > Math.pow(2, 31)) {
        return 0
    }
    let str = new String(x);
    let array = Array.from(str)
    let fuhao = null
    if (array[0] === '-') {
        fuhao = true;
        array.shift();
    }
    array.reverse();
    if (array[0] === '0') {
        array.shift();
    }
    if (fuhao) {
        array.unshift('-')
    }
    return parseInt(array.join(''))
};

class Solution {
    public int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            if (rev > Integer.MAX_VALUE / 10 || (rev == Integer.MAX_VALUE / 10 && pop > 7)) return 0;
            if (rev < Integer.MIN_VALUE / 10 || (rev == Integer.MIN_VALUE / 10 && pop < -8)) return 0;
            rev = rev * 10 + pop;
        }
        return rev;
    }
}

var reverse = function (x) {
    let rev = 0;
    while (x != 0) {
        let pop = x % 10;
        x = parseInt(x /= 10)
        if (rev > Math.pow(2, 31) / 10 || (rev == Math.pow(2, 31) / 10 && pop > 7)) return 0;
        if (rev < Math.pow(-2, 31) / 10 || (rev == Math.pow(-2, 31) / 10 && pop < -8)) return 0;
        rev = rev * 10 + pop;
    }
    return rev;
};