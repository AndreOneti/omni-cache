# omni-cache

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Maintenance][maintenance-img]][maintenance-url]
[![GitHub issues][issues-open-image]][issues-open-url]

<br>

Simple memory cache from server side.

<br>

## How to

### Install

``` sh
npm i --save omni-cache
or
yarn add omni-cache
```

<hr>

### Use

#### Without options on create

``` javascript

const { Cache } = require('omni-cache');

const cache = new Cache();

cache.put('myKey', 'myValue', 1500);              // Time im ms
cache.get('myKey');                               // myValue
cache.keys();                                     // [ 'myKey' ]
cache.size();                                     // 1
cache.debug(true);                                // No return
cache.inDebug();                                  // true
cache.exportJson();                               // true
cache.del('myKey');                               // true
cache.clear();                                    // No return

```
<hr>

#### With options on create

``` javascript

const { Cache } = require('omni-cache');

const cache = new Cache({
  debug: true,
  ttl: 1500
});

cache.put('myKey', 'myValue');                    // Expire time id ttl by default
cache.get('myKey');                               // myValue
cache.keys();                                     // [ 'myKey' ]
cache.size();                                     // 1
cache.inDebug();                                  // true
cache.debug(false);                               // No return
cache.inDebug();                                  // false
cache.exportJson();                               // true
cache.del('myKey');                               // true
cache.clear();                                    // No return

```

<br>
<hr>

[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/AndreOneti/omni-cache/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/omni-cache.svg
[npm-url]: https://npmjs.org/package/omni-cache
[downloads-image]: https://img.shields.io/npm/dm/omni-cache.svg
[downloads-url]: https://npmjs.org/package/omni-cache
[maintenance-img]: https://img.shields.io/badge/Maintained%3F-yes-green.svg
[maintenance-url]: https://github.com/AndreOneti/omni-cache
[issues-open-image]: https://img.shields.io/github/issues/AndreOneti/omni-cache.svg
[issues-open-url]: https://github.com/AndreOneti/omni-cache/issues?q=is%3Aopen+is%3Aissue
