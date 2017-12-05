Local Cache
===================
[![Coverage Status](https://coveralls.io/repos/adeelakram696/local-cache/badge.svg?branch=master)](https://coveralls.io/r/adeelakram696/local-cache?branch=master)

Local cache will cache your application data very useful for API responses to cache which reduces server hits. Easy to use and Easy to understand

----------
Basic useful feature list:

 * Cache any type of data on js level
 * Auto clear in given time with each data [default 5 mint]
 * group base cache
 * Static Cache overall the application
 * Extra parameter provided to search, divide same identifier and key with paginated data

installation
===================

    npm install js-local-cache

Class Functions
===================
Functions List:

    setData(group, key, data, cachedTimeout, extraParam)
    getData(group, key, extraParam)
    clearData(group, key, extraParam)
    clearGroup(group)
    clearAllCache() // Use always when logged out

Params Types:

| Param     | Type | Required   | Default   |
| ------- | ---- | --- | --- |
| group | String Or Integer | Required|     |
| key | String Or Integer / unique | Required|     |
| data | Any | Required |     |
| cachedTimeout | Miliseconds | Optional |  300000 //5 mints   |
| extraParam | String Or Integer |   Optional   | null|



Coding Example
-------------
```javascript
import Cache from 'js-local-cache';

function getCustomerList(token, pageNum, forceUpdate){
// token can be used as unique key or any thing you
// in case forceUpdate
const cacheData = Cache.getData('customer', token, pageNum);
if(forceUpdate){
  Cache.clearData('customer', token, pageNum);
   // OR
  Cache.clearGroup('customer');
}
if(cacheData && !forceUpdate){
  return new Promise((resolve) => {
    resolve(cacheData);
  });
}

  return promise((resolve, reject) => {
    request(url).end(response => {
      Cache.setData('customer', token, response, 100000, pageNum);
      // this data will be wipedout after 100000 miliseconds
      resolve(response);
    });
  });
}
```
**Unit Tests**
Unit test provided with 100% Coverage

    npm run test

      ✓ blank add with no error (5ms)
      ✓ blank fetch with no error (1ms)
      ✓ blank clear with no error (1ms)
      ✓ set and get data (1ms)
      ✓ clear data
      ✓ Add data and clear identifier (1ms)
      ✓ remove data from array false
      ✓ clear All data (1ms)
      ✓ check cache timeout clear (1ms)
      ✓ clear All data when already empty

    Test Suites: 1 passed, 1 total
    Tests:       10 passed, 10 total
    Snapshots:   0 total
    Time:        1.751s
    Ran all test suites.

**License**

    MIT
