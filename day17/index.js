var TimeLimitedCache = function() {
    this.cache = new Map(); // キーとその値、期限を保持するMap
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
    const currentTime = Date.now(); // 現在の時間を取得

    if (this.cache.has(key)) {
        const { expirationTime, timeoutId } = this.cache.get(key);

        if (expirationTime > currentTime) {
            clearTimeout(timeoutId); // 既存のタイマーをクリア
            this._setWithExpiration(key, value, duration); // 新しい値でセット
            return true; // 期限内のキーが存在していたためtrueを返す
        }
    }

    // 新しいキーまたは期限切れのキーの場合
    this._setWithExpiration(key, value, duration);
    return false;
};

TimeLimitedCache.prototype._setWithExpiration = function(key, value, duration) {
    const expirationTime = Date.now() + duration; // 期限時間を計算
    const timeoutId = setTimeout(() => { // duration後にキーを削除するタイマーを設定
        this.cache.delete(key);
    }, duration);

    this.cache.set(key, { value, expirationTime, timeoutId }); // マップにデータをセット
};

TimeLimitedCache.prototype.get = function(key) {
    const currentTime = Date.now();

    if (this.cache.has(key)) {
        const { value, expirationTime } = this.cache.get(key);

        if (expirationTime > currentTime) { // 期限切れでない場合
            return value;
        } else {
            this.cache.delete(key); // 期限切れの場合は削除
        }
    }

    return -1; // 期限切れか存在しないキーの場合
};

TimeLimitedCache.prototype.count = function() {
    const currentTime = Date.now();
    let count = 0;

    for (const [key, { expirationTime }] of this.cache.entries()) {
        if (expirationTime > currentTime) {
            count++;
        } else {
            this.cache.delete(key); // 期限切れの場合は削除
        }
    }

    return count; // 有効なキーの数を返す
};