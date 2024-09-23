/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n, depth = 0) {
    let result = [];

    for (const item of arr) {
        if ( depth < n && Array.isArray(item)) {
            result.push(...flat(item, n, depth + 1));
        } else {
            result.push(item);
        }
    }
    return result;
};
