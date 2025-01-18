import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { getByQueryId } from './index';
import { sort } from './sort';
import { ITableHeader } from '../types';
import { numberFormatter } from '../components/Table/formatters';

const Wrapper = () => {
  return (
    <div>
      <div query-id="test">Test</div>
    </div>
  );
};

describe('getByQueryId', () => {
  it('should get elements by query id', () => {
    render(<Wrapper />);

    const test = getByQueryId('test') as HTMLElement;
    expect(test).toBeInTheDocument();
  });
});

describe('sort', () => {
  it('should sort better', () => {
    const nums = [
      { id: 1, value: 1 },
      { id: 9, value: 9 },
      { id: 4, value: 4 },
      { id: 7, value: 7 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
      { id: 0, value: 0 },
    ];

    const tableHeaders: ITableHeader = {
      column: 'id',
      alias: 'id',
      dataType: 'number',
      visible: true,
      width: 100,
      align: 'center',
      renderer: () => {},
      formatter: numberFormatter,
    };

    const sorted = sort(nums, 'value', 'asc', tableHeaders);
    expect(sorted).toEqual([
      {
        id: 0,
        value: 0,
      },
      {
        id: 1,
        value: 1,
      },
      {
        id: 2,
        value: 2,
      },
      {
        id: 3,
        value: 3,
      },
      {
        id: 4,
        value: 4,
      },
      {
        id: 7,
        value: 7,
      },
      {
        id: 9,
        value: 9,
      },
    ]);
  });
});
