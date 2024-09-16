/**
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function() {
    const lastValue = this.at(-1);
    return lastValue === undefined ? -1 : lastValue;
};


/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */