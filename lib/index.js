'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalCache = function () {
  function LocalCache() {
    _classCallCheck(this, LocalCache);

    this.cachedData = {};
  }

  // it removes selected object from a given array
  /*
  Params
    *arr: array
    *key: string
    *val: value of key as string
    *extraParama: number or string
  */


  _createClass(LocalCache, [{
    key: 'removeObjFromArray',
    value: function removeObjFromArray() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var key = arguments[1];
      var val = arguments[2];
      var extraParam = arguments[3];

      var index = -1;
      arr.some(function (obj, ind) {
        if (obj[key] === val && obj.extraParam === extraParam) {
          index = ind;
          return true;
        }
        return false;
      });
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
  }, {
    key: 'setData',

    // set data into cache on given key, extraParam inside given identifier
    /*
    Params
      *identifier: string
      *data: any
      key: string
      cacheTimeout: miliseconds as number
      extraParama: number or string
    */
    value: function setData(key) // default null
    {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var cacheTimeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300000;

      var _this = this;

      var identifier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'default';
      var extraParam = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      if (!((this.cachedData[identifier] || []).length > 0)) {
        this.cachedData[identifier] = [];
      }
      this.cachedData[identifier].push({
        identifier: identifier,
        extraParam: extraParam,
        key: key,
        data: data
      });
      setTimeout(function () {
        _this.removeObjFromArray(_this.cachedData[identifier], 'key', key, extraParam);
      }, cacheTimeout);
    }
  }, {
    key: 'getData',


    // get data from cache on given key, extraParam inside given identifier
    /*
    Params
      *identifier: string
      *key: string
      extraParama: number or string
    */
    value: function getData(key) // default null
    {
      var identifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
      var extraParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var cacheData = (this.cachedData[identifier] || []).find(function (data) {
        return data.key === key && data.extraParam === extraParam;
      });
      return cacheData && cacheData.data || null;
    }
  }, {
    key: 'clearAllCache',


    // clear all cached data
    value: function clearAllCache() {
      var _this2 = this;

      (Object.keys(this.cachedData || {}) || []).forEach(function (identifier) {
        delete _this2.cachedData[identifier];
      });
      this.cachedData = {};
    }
  }, {
    key: 'clearData',


    // clear selected key data inside identifier
    /*
    Params
      *identifier: string
      *key: string
      extraParama: number or string
    */
    value: function clearData(key) // default null
    {
      var identifier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
      var extraParam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this.removeObjFromArray(this.cachedData[identifier], 'key', key, extraParam);
    }
  }, {
    key: 'clearGroup',


    // clears all cached data for identifier
    /*
    Params
      *identifier: string
    */
    value: function clearGroup() {
      var identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

      delete this.cachedData[identifier];
    }
  }]);

  return LocalCache;
}();

// to make it singelton its construction initiated while export.


module.exports = new LocalCache();