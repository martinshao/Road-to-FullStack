
longestCommonPrefix(["dog","racecar","car"]);
longestCommonPrefix(["flower","flow","flight"]);

/**************************解法一*********************************/
var longestCommonPrefix = function(strs) {
    if(strs.includes('') || strs.length === 0) {
        return '';
    }

    let common = [];
    let commonPrefix = '';
    let minLength = strs[0].length;
    for (let i = 0; i < strs.length; i++) {
        const word = strs[i];
        minLength = Math.min(minLength, word.length);
        let array = Array.from(word)
        for (let j = 0; j < array.length; j++) {
            const letter = array[j];
            if (common[j]) {
                common[j].add(letter);
            } else {
                const set = new Set();
                set.add(letter)
                common.push(set);
            }
        }
    }

    common.length = minLength
    for (let i = 0; i < common.length; i++) {
        const set = common[i];
        if(set.size > 1) {
            return commonPrefix
        } else {
            var setIter = set.values();
            commonPrefix += setIter.next().value;
        }
    }
    return commonPrefix;
};
/**************************解法一*********************************/


/**************************解法二*********************************/
var longestCommonPrefix = function(strs) {
    if (strs.length == 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++)
        while (strs[i].indexOf(prefix) != 0) {
            prefix = prefix.substring(0, prefix.length() - 1);
            if (prefix === null || prefix === '') return "";
        }        
    return prefix;
 }
/**************************解法二*********************************/


/**************************解法三*********************************/
var longestCommonPrefix = function(strs) {
    if (strs == null || strs.length == 0) return "";
    for (let i = 0; i < strs[0].length ; i++){
        let c = strs[0].charAt(i);
        for (let j = 1; j < strs.length; j ++) {
            if (i == strs[j].length || strs[j].charAt(i) != c)
                return strs[0].substring(0, i);             
        }
    }
    return strs[0];
}
/**************************解法三*********************************/




