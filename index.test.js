import LocalCache from './index';

const mockData = [{
  name: 'localCache',
  mockId: 1
},{
  name: 'local-Cache',
  mockId: 2
}
];
const groups = ['a', 'b'];
const keys = [1,2];

test('blank add with no error', () => {
  expect(LocalCache.setData()).toBe(undefined);
});

test('blank fetch with no error', () => {
  expect(LocalCache.getData()).toBe(null);
});

test('blank clear with no error', () => {
  expect(LocalCache.clearData()).toBe(undefined);
  expect(LocalCache.clearGroup()).toBe(undefined);
  expect(LocalCache.clearAllCache()).toBe(undefined);
});

test('set and get data', () => {
  LocalCache.setData(
    keys[0],
    mockData[0],
    300000,
    groups[0]
  );
  expect(LocalCache.getData(
    keys[0],
    groups[0]
  )).toBe(mockData[0]);
});

test('clear data', () => {
  LocalCache.clearData(
    keys[0],
    groups[0]
  );
  expect(LocalCache.getData(
    keys[0],
    groups[0]
  )).toBe(null);
});

test('Add data and clear group', () => {
  LocalCache.setData(
    keys[0],
    mockData[0],
    300000,
    groups[0]
  );
  LocalCache.setData(
    keys[1],
    mockData[1],
    300000,
    groups[1]
  );
  LocalCache.clearGroup(
    groups[0],
  );
  expect(LocalCache.getData(
    keys[0],
    groups[0]
  )).toBe(null);
  expect(LocalCache.getData(
    keys[1],
    groups[1]
  )).toBe(mockData[1]);
});

test('remove data from array false', () => {
  LocalCache.clearData(
    keys[0],
    groups[1]
  );
  expect(LocalCache.getData(
    keys[1],
    groups[1]
  )).toBe(mockData[1]);
});

test('clear All data', () => {
  LocalCache.clearAllCache();
  expect(LocalCache.getData(
    keys[1],
    groups[1]
  )).toBe(null);
});

jest.useFakeTimers();
test('check cache timeout clear', () => {
  LocalCache.setData(
    keys[0],
    mockData[0],
    1000,
    groups[0]
  );
  jest.runTimersToTime(1010);
  expect(LocalCache.getData(
    keys[0],
    groups[0]
  )).toBe(null);
});

test('clear All data when already empty', () => {
  LocalCache.clearAllCache();
  expect(LocalCache.getData(
    keys[1],
    groups[1]
  )).toBe(null);
});

