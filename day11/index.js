/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    const cache = new Map();
    let callCount = 0;

    const memoizedFn = function(...args) {
        const key = JSON.stringify(args); // 引数を文字列化してキャッシュのキーとして使用

        if (cache.has(key)) {
            return cache.get(key); // キャッシュがあれば、それを返す
        }

        const result = fn(...args); // 関数を実行して結果を得る
        cache.set(key, result);     // 結果をキャッシュに保存
        callCount++;                // 実際に関数が呼び出された回数をカウント

        return result;              // 計算結果を返す
    };

    // getCallCountメソッドを追加
    memoizedFn.getCallCount = () => callCount;

    return memoizedFn; // メモ化された関数を返す
}

/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */
