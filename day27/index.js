/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    if(Array.isArray(obj)) {
        return obj
        .map(item => compactObject(item))
        .filter(Boolean);
    } else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj)
        .reduce((acc, key) => {
            const value = compactObject(obj[key])
            if (value){
                acc[key] = value;
            }
            return acc;
        }, {});
    }
    return obj;
};
