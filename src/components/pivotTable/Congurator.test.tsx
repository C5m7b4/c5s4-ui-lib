import { render, act, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PivotTable from './PivotTable';
import { data } from '../../../playground/src/data/pivotData';
import { headers } from '../../../playground/src/data/headers';
import { getByQueryId } from '../../mocks/query';
import userEvent from '@testing-library/user-event';

describe('Configurator', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <PivotTable
          data={data}
          headers={headers}
          usePivot={true}
          demoMode={false}
        />,
      );
    });

    const expander = getByQueryId('expander');
    await userEvent.click(expander);
  });
});
