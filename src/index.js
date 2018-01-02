class LocalCache {
  constructor() {
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
  removeObjFromArray(arr = [], key, val, extraParam){
    let index = -1;
    arr.some((obj, ind) => {
      if (obj[key] === val && obj.extraParam === extraParam) {
        index = ind;
        return true;
      }
      return false;
    });
    if (index > -1) {
      arr.splice(index, 1);
    }
  };
  // set data into cache on given key, extraParam inside given identifier
  /*
  Params
    *identifier: string
    *data: any
    key: string
    cacheTimeout: miliseconds as number
    extraParama: number or string
  */
  setData(
    key,
    data = null, // default null
    cacheTimeout = 300000, // default 5 minutes
    identifier = 'default',
    extraParam = null // default null
  ) {
    if (!((this.cachedData[identifier] || []).length > 0)) {
      this.cachedData[identifier] = [];
    }
    this.cachedData[identifier].push({
      identifier,
      extraParam,
      key,
      data,
    });
    setTimeout(() => {
      this.removeObjFromArray(this.cachedData[identifier], 'key', key, extraParam);
    }, cacheTimeout);
  };

  // get data from cache on given key, extraParam inside given identifier
  /*
  Params
    *identifier: string
    *key: string
    extraParama: number or string
  */
  getData(
    key,
    identifier = 'default',
    extraParam = null // default null
  ) {
    const cacheData = (this.cachedData[identifier] || []).find(data => (
      data.key === key &&
      data.extraParam === extraParam
    ));
    return (cacheData && cacheData.data) || null;
  };

  // clear all cached data
  clearAllCache(){
    (Object.keys(this.cachedData || {}) || []).forEach(identifier => {
      delete this.cachedData[identifier];
    });
    this.cachedData = {};
  };

  // clear selected key data inside identifier
  /*
  Params
    *identifier: string
    *key: string
    extraParama: number or string
  */
  clearData(
    key,
    identifier = 'default',
    extraParam = null // default null
  ) {
    this.removeObjFromArray(this.cachedData[identifier], 'key', key, extraParam);
  };

  // clears all cached data for identifier
  /*
  Params
    *identifier: string
  */
  clearGroup(
    identifier = 'default'
  ) {
    delete this.cachedData[identifier];
  }

}

// to make it singelton its construction initiated while export.
module.exports = new LocalCache();
