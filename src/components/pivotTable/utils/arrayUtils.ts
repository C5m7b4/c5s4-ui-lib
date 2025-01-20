import { Column, ValueType } from '../types';
import { unique } from './unique';

export const arrSum = <T>(
  arr: T[],
  lookupField: keyof T,
  lookupValue: keyof T,
  valueField: keyof T,
) => {
  return arr.reduce((acc, cur) => {
    if (cur[lookupField] === lookupValue) {
      return acc + Number(cur[valueField]);
    } else {
      return acc;
    }
  }, 0);
};

export const grandTotalSum = <T>(arr: T[], lookupField: keyof T) => {
  const total = arr.reduce((acc, cur) => {
    return acc + Number(cur[lookupField]);
  }, 0);
  return total;
};

export const arrCount = <T>(
  arr: T[],
  lookupField: keyof T,
  lookupValue: keyof T,
) => {
  return arr.reduce((acc, cur) => {
    if (cur[lookupField] === lookupValue) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
};

export const grandTotalCount = <T>(arr: T[]) => {
  return arr.reduce((acc) => {
    return acc + 1;
  }, 0);
};

export const arrAvg = <T>(
  arr: T[],
  lookupField: keyof T,
  lookupValue: keyof T,
  valueField: keyof T,
) => {
  let itemCount = 0;
  const total = arr.reduce((acc, cur) => {
    if (cur[lookupField] === lookupValue) {
      itemCount++;
      return acc + Number(cur[valueField]);
    } else {
      return acc;
    }
  }, 0);
  return total / itemCount;
};

export const aggregateOptions = [
  {
    fn: arrSum,
    label: 'Sum',
  },
  {
    fn: arrCount,
    label: 'Count',
  },
  {
    fn: arrAvg,
    label: 'Avg',
  },
];

export const doesRowExist = <T>(arr: T[], field: keyof T, value: keyof T) => {
  let i = 0;
  for (const el of arr) {
    if (el[field] == value) {
      return {
        found: true,
        record: el,
        index: i,
      };
    }
    i++;
  }
  return {
    found: false,
  };
};

export const getColumnCount = <T>(
  values: ValueType<T>[],
  columns: Column<T>[],
  data: T[],
) => {
  // this is actually going to return an array of items that thave the unique value that we are targeting
  // this might be able to be reconstructed to be a little more efficient
  const colCount = columns
    .map((c) => {
      return getUniqueColumnValues(data, c.label);
    })
    .reduce((sum, cur) => sum + cur, 0);
  const numberOfColumns = values.length + colCount + 1;
  if (numberOfColumns > 0) {
    return 'grid-cols-' + numberOfColumns.toString();
  } else {
    return 'grid-cols-1';
  }
};

export const getUniqueColumnValues = <T>(data: T[], key: keyof T) => {
  const result = unique(data, key);
  return result.length;
};

export const getUniqueColumns = <T>(data: T[], key: keyof T) => {
  const result = unique(data, key);
  return result;
};
