import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PivotTable from './PivotTable';
import { data } from '../../../playground/src/data/pivotData';
import { headers } from '../../../playground/src/data/headers';

describe('PivotTable', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <PivotTable
          data={data}
          headers={headers}
          usePivot={false}
          demoMode={true}
        />,
      );
    });

    const headerText = screen.getByTestId('header-text');
    expect(headerText).toHaveTextContent('Basic Table Example');
  });
  it('should render without demo mode', async () => {
    await act(async () => {
      render(
        <PivotTable
          data={data}
          headers={headers}
          usePivot={true}
          demoMode={true}
        />,
      );
    });

    const headerText = screen.getByTestId('header-text');
    expect(headerText).toHaveTextContent('Pivot Table Example');
  });
  it('should render without props', async () => {
    await act(async () => {
      render(<PivotTable data={data} headers={headers} />);
    });
  });
  it('should render without demo mode', async () => {
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
  });
  it('should toggle pivot mode', async () => {
    const fn = vi.fn();
    await act(async () => {
      render(
        <PivotTable
          data={data}
          headers={headers}
          usePivot={true}
          demoMode={true}
          setUsePivot={fn}
        />,
      );
    });

    const btn = screen.getByTestId('btnPivot');
    await fireEvent.click(btn);
  });

  it('should handle multiple rows', async () => {
    const fn = vi.fn();
    await act(async () => {
      render(
        <PivotTable
          data={data}
          headers={headers}
          usePivot={true}
          demoMode={true}
          setUsePivot={fn}
        />,
      );
    });

    const company = screen.getByTestId('field-5');
    const rows = screen.getByTestId('filtered-rows');
    const dragStartEvent = createEvent.dragStart(company);
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
      fireEvent(company, dragStartEvent);
      fireEvent(rows, dragOverEvent);
      fireEvent(rows, dropEvent);
    });

    const cookieType = screen.getByTestId('field-4');
    const dragStartEvent2 = createEvent.dragStart(cookieType);

    Object.defineProperty(dragStartEvent2, 'dataTransfer', {
      value: {
        setData: vi.fn(),
      },
    });

    await act(async () => {
      fireEvent(cookieType, dragStartEvent2);
      fireEvent(rows, dragOverEvent);
      fireEvent(rows, dropEvent);
    });

    const unitsSold = screen.getByTestId('field-6');
    const dragStartEvent3 = createEvent.dragStart(unitsSold);
    const values = screen.getByTestId('filter-values');
    const dragOverEvent2 = createEvent.dragOver(values);
    const dropEvent2 = createEvent.drop(values);

    Object.defineProperty(dragStartEvent3, 'dataTransfer', {
      value: {
        setData: vi.fn(),
      },
    });
    Object.defineProperty(dragOverEvent2, 'dataTransfer', {
      value: { dropEffect: 'move' },
    });
    Object.defineProperty(dropEvent2, 'dataTransfer', {
      value: { getData: vi.fn(() => 'company') },
    });

    await act(async () => {
      fireEvent(unitsSold, dragStartEvent3);
      fireEvent(values, dragOverEvent2);
      fireEvent(values, dropEvent2);
    });

    screen.debug();
  });
});
