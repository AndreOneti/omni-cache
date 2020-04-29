export class Cache {
  private _cache: Object | any | null;
  private _ttl: number | null;
  private _debug: boolean;
  private _size: number;

  constructor(options?: OptionalConstructor) {
    this._debug = options?.debug || false;
    this._cache = Object.create(null);
    this._ttl = options?.ttl || null;
    this._size = 0;
  }

  /**
   * Add new key:value on memory cache.
   * @param {string} key Key to chache in memory.
   * @param {string} value Required value to save on cache.
   * @param {number} time expired time in ms.
   * @returns {string} saved value.
   */
  put(key: string, value: string, time?: number): string {
    time = time || this._ttl || undefined;
    if (this._debug) {
      console.log(`caching: ${key} = ${value} (@${time || 'indeterminate'})`);
    }
    var oldRecord = this._cache[key];
    if (oldRecord) {
      clearTimeout(oldRecord.timeout);
    } else {
      this._size++;
    }
    var record: any = {
      value,
      expire: time ? time + Date.now() : "indeterminate"
    };
    if (!isNaN(record.expire)) {
      record.timeout = setTimeout(() => {
        this._del(key);
      }, time);
    }
    this._cache[key] = record;
    return value;
  }

  /**
   * Delete key:value from memory cache.
   * @param {string} key Key to delete chache.
   * @returns {boolean} canDelete.
   */
  del(key: string): boolean {
    if (this._debug) {
      console.log(`excluding: ${key}`);
    }
    var canDelete = true;
    var oldRecord = this._cache[key];
    if (oldRecord) {
      clearTimeout(oldRecord.timeout);
      if (typeof oldRecord.expire == 'number' && oldRecord.expire < Date.now()) {
        canDelete = false;
      }
    } else {
      canDelete = false;
    }
    if (canDelete) {
      this._del(key);
    }
    return canDelete;
  }

  private _del(key: string): void {
    this._size--;
    delete this._cache[key];
  }

  /**
   * Clean cache.
   * @returns {void}
   */
  clear(): void {
    for (let key in this._cache) {
      if (this._debug) {
        console.log(`excluding: ${key}`);
      }
      clearTimeout(this._cache[key].timeout);
    }
    this._size = 0;
    this._cache = Object.create(null);
  }

  /**
   * Get value on memory cache.
   * @param {string} key Key to get chached value.
   * @returns {string|null} Return saved value.
   */
  get(key: string): string | null {
    var data = this._cache[key];
    if (this._debug) {
      console.log(`getting: ${key} = ${data.value || ""} (@${data.time || 'indeterminate'})`);
    }
    if (typeof data != "undefined") {
      if (typeof data.expire == 'number' && data.expire > Date.now()) {
        return data.value;
      } else if (data.expire == 'indeterminate') {
        return data.value;
      } else {
        this._size--;
        delete this._cache[key];
      }
    }
    return null;
  }

  /**
   * Get cache size.
   * @returns {number} Return cache size.
   */
  size(): number {
    this._size = 0;
    for (let key in this._cache) {
      this._size++;
    }
    if (this._debug) {
      console.log(`size: ${this._size}`);
    }
    return this._size;
  }

  /**
   * Set debug mode.
   * @param {boolean} bool
   * @returns {void}
   */
  debug(bool: boolean): void {
    this._debug = bool;
  };

  /**
   * Get if in debug mode.
   * @returns {boolean}
   */
  inDebug(): boolean {
    return this._debug;
  };

  /**
   * Get all keys on memory
   * @returns {string[]}
   */
  keys(): string[] {
    if (this._debug) {
      console.log(`Keys: ${Object.keys(this._cache)}`);
    }
    return Object.keys(this._cache);
  };

  exportJson(): object {
    var plainJsCache: any = {};
    for (var key in this._cache) {
      var record = this._cache[key];
      plainJsCache[key] = {
        value: record.value,
        expire: record.expire || 'NaN',
      };
    }

    return plainJsCache;
  };
}

interface OptionalConstructor {
  debug?: boolean;
  ttl?: number;
}
