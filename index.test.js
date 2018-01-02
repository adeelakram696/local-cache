'use strict';

var _index = require('./lib/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockData = [{
  name: 'localCache',
  mockId: 1
}, {
  name: 'local-Cache',
  mockId: 2
}];
var groups = ['a', 'b'];
var keys = [1, 2];

test('blank add with no error', function () {
  expect(_index2.default.setData()).toBe(undefined);
});

test('blank fetch with no error', function () {
  expect(_index2.default.getData()).toBe(null);
});

test('blank clear with no error', function () {
  expect(_index2.default.clearData()).toBe(undefined);
  expect(_index2.default.clearGroup()).toBe(undefined);
  expect(_index2.default.clearAllCache()).toBe(undefined);
});

test('set and get data', function () {
  _index2.default.setData(keys[0], mockData[0], 300000, groups[0]);
  expect(_index2.default.getData(keys[0], groups[0])).toBe(mockData[0]);
});

test('clear data', function () {
  _index2.default.clearData(keys[0], groups[0]);
  expect(_index2.default.getData(keys[0], groups[0])).toBe(null);
});

test('Add data and clear group', function () {
  _index2.default.setData(keys[0], mockData[0], 300000, groups[0]);
  _index2.default.setData(keys[1], mockData[1], 300000, groups[1]);
  _index2.default.clearGroup(groups[0]);
  expect(_index2.default.getData(keys[0], groups[0])).toBe(null);
  expect(_index2.default.getData(keys[1], groups[1])).toBe(mockData[1]);
});

test('remove data from array false', function () {
  _index2.default.clearData(keys[0], groups[1]);
  expect(_index2.default.getData(keys[1], groups[1])).toBe(mockData[1]);
});

test('clear All data', function () {
  _index2.default.clearAllCache();
  expect(_index2.default.getData(keys[1], groups[1])).toBe(null);
});

jest.useFakeTimers();
test('check cache timeout clear', function () {
  _index2.default.setData(keys[0], mockData[0], 1000, groups[0]);
  jest.runTimersToTime(1010);
  expect(_index2.default.getData(keys[0], groups[0])).toBe(null);
});

test('clear All data when already empty', function () {
  _index2.default.clearAllCache();
  expect(_index2.default.getData(keys[1], groups[1])).toBe(null);
});
