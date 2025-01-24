import {
  render,
  act,
  screen,
  fireEvent,
  createEvent,
} from '@testing-library/react';
import Configurator from '../../../../src/components/pivotTable/Configurator';
import { describe, expect, it, vi } from 'vitest';
import { data } from '../../../../playground/src/data/pivotData';
import '@testing-library/jest-dom';
import PivotTable from '../PivotTable';
import { headers } from '../../../../playground/src/data/headers';

describe('PivotTable', () => {
  it('should handle some rows', async () => {
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

    const field = screen.getByTestId('field-5');
    const rows = screen.getByTestId('filtered-rows');
    const dragStartEvent = createEvent.dragStart(field);
    const dragOverEvent = createEvent.dragOver(rows);
    const dropEvent = createEvent.drop(rows);
    Object.defineProperty(dragStartEvent, 'dataTransfer', {
      value: {
        setData: vi.fn(),
      },
    });
    Object.defineProperty(dragOverEvent, 'dataTransfer', {
      value: { dropEffect: 'move' },
    });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { getData: vi.fn(() => 'company') },
    });

    await act(async () => {
      fireEvent(field, dragStartEvent);
      fireEvent(rows, dragOverEvent);
      fireEvent(rows, dropEvent);
    });
    expect(rows.children.length).toEqual(1);
    expect(rows.textContent).toContain('company');
  });
});
