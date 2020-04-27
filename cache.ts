class cache {

  private _missCount: number;
  private _hitCount: number;
  private _debug: boolean;
  private _cache: Object;
  private _size: number;

  constructor() {
    this._cache = Object.create(null);
    this._debug = false;
    this._missCount = 0;
    this._hitCount = 0;
    this._size = 0;
  }

  get(key: string): string {
    return this._cache[key].value;
  }
}

export default new cache();
