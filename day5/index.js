/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    if (arguments.length === 1) {
        console.log(2)
    }
    return arr.map((value, index) => fn(value, index));
};
