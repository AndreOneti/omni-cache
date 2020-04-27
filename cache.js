'use strict';

function Cache() {
  var _cache = Object.create(null);
  var _debug = false;
  var _missCount = 0;
  var _hitCount = 0;
  var _size = 0;

  /**
   * Add new key:value on memory cache.
   * @param {string} key Key to chache in memory.
   * @param {string} value Required value to save on cache.
   * @param {number} time ttl(time-to-live) or expired time from cache.
   * @returns {string} saved value.
   */
  this.put = function (key, value, time) {
    if (typeof time !== 'undefined' && (typeof time !== 'number' || isNaN(time) || time <= 0)) {
      throw new Error('Cache timeout must be a positive number');
    }

    var oldRecord = _cache[key];
    if (oldRecord) {
      clearTimeout(oldRecord.timeout);
    } else {
      _size++;
    }

    var record = {
      value: value,
      expire: time + Date.now()
    };

    if (!isNaN(record.expire)) {
      record.timeout = setTimeout(function () {
        _del(key);
      }.bind(this), time);
    }

    _cache[key] = record;

    return value;
  };

  /**
   * Delete key:value from memory cache.
   * @param {string} key Key to delete chache.
   * @returns {boolean} canDelete.
   */
  this.del = function (key) {
    var canDelete = true;

    var oldRecord = _cache[key];
    if (oldRecord) {
      clearTimeout(oldRecord.timeout);
      if (!isNaN(oldRecord.expire) && oldRecord.expire < Date.now()) {
        canDelete = false;
      }
    } else {
      canDelete = false;
    }

    if (canDelete) {
      _del(key);
    }

    return canDelete;
  };

  function _del(key) {
    _size--;
    delete _cache[key];
  }

  /**
   * Clean cache.
   * @returns {void}
   */
  this.clear = function () {
    for (var key in _cache) {
      clearTimeout(_cache[key].timeout);
    }
    _size = 0;
    _cache = Object.create(null);
  };

  /**
   * Get value on memory cache.
   * @param {string} key Key to get chached value.
   * @returns {string|null} Return saved value.
   */
  this.get = function (key) {
    var data = _cache[key];
    if (typeof data != "undefined") {
      if (!isNaN(data.expire) && data.expire >= Date.now()) {
        return data.value;
      } else {
        _size--;
        delete _cache[key];
      }
    }
    return null;
  };

  /**
   * Get cache size.
   * @returns {number} Return cache size.
   */
  this.size = function () {
    return _size;
  };

  this.memsize = function () {
    var size = 0,
      key;
    for (key in _cache) {
      size++;
    }
    return size;
  };

  this.debug = function (bool) {
    _debug = bool;
  };

  this.inDebug = function () {
    return _debug;
  };

  this.hits = function () {
    return _hitCount;
  };

  this.misses = function () {
    return _missCount;
  };

  this.keys = function () {
    return Object.keys(_cache);
  };
}

module.exports = new Cache();
module.exports.Cache = Cache;
