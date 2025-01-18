import { ITableHeader } from '../types';
import { IDataType } from '../types';

export type SortDirection = 'asc' | 'desc';

export const converter = (value: string, dataType: IDataType) =>
  dataType === 'number' ? Number(value.replace('$', '')) : value;

export const sort = <T>(
  arr: T[],
  field: keyof T,
  direction: SortDirection = 'asc',
  header: ITableHeader,
): T[] => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = converter(String(arr[0][field]), header.dataType);
  const pivotRecord = arr[0];
  const leftArr: T[] = [];
  const rightArr: T[] = [];

  if (direction === 'asc') {
    for (let i = 1; i < arr.length; i++) {
      if (converter(String(arr[i][field]), header.dataType) < pivot) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }
  } else {
    for (let i = 1; i < arr.length; i++) {
      if (converter(String(arr[i][field]), header.dataType) > pivot) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }
  }

  return [
    ...sort(leftArr, field, direction, header),
    pivotRecord,
    ...sort(rightArr, field, direction, header),
  ];
};
