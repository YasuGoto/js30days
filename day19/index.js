/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function(functions) {
    return new Promise((resolve, reject) => {
        let results = new Array(functions.length),
        count = 0;
    
        functions.forEach((fn, index) => {
            fn().then(result => {
                results[index] = result;
                count++;

                if(count === functions.length) {
                    resolve(results);
                }
            }).catch(error => {
                reject(error);
            })
        })
    })
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */