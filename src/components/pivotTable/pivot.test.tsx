import { act, render } from '@testing-library/react';
import Pivot from '../../../src/components/pivotTable/pivot';
import { describe, it, vi } from 'vitest';
import { data } from '../../../playground/src/data/pivotData';

describe('Pivot', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <Pivot
          data={data}
          rows={[]}
          setRows={vi.fn()}
          values={[]}
          setValues={vi.fn()}
          columns={[]}
        />,
      );
    });
  });
});
