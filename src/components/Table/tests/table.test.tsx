import { render, act, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  tableData,
  tableHeaders,
} from '../../../../playground/src/data/tableData';
import Table from '../index';
import { getByQueryId } from '../../../mocks/query';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const Wrapper = () => {
  return (
    <div query-id="outside">
      <Table data={tableData} headers={tableHeaders} />
    </div>
  );
};

describe('Table', () => {
  it('should render', async () => {
    await act(async () => {
      render(<Table data={tableData} headers={tableHeaders} />);
    });

    const table = getByQueryId('table');
    expect(table).toBeInTheDocument();
  });
  it('should handle clicking the column header', async () => {
    await act(async () => {
      render(<Table data={tableData} headers={tableHeaders} />);
    });

    const table = getByQueryId('table');
    const chevron = table.querySelector('thead>tr>th:first-of-type>div>svg');
    await userEvent.click(chevron as Element);

    const columnConfigText = screen.getByText('Column Configuration');
    expect(columnConfigText).toBeInTheDocument();
  });
  it('should handle a basic sort', async () => {
    await act(async () => {
      render(<Table data={tableData} headers={tableHeaders} />);
    });

    const table = getByQueryId('table');
    const th = table.querySelector('thead>tr>th:first-child>div>div');
    await userEvent.click(th as Element);

    const median = getByQueryId('median');
    expect(median).toBeInTheDocument();

    await userEvent.click(th as Element);
  });
  it('should handle clicking a column that is not a number', async () => {
    await act(async () => {
      render(<Table data={tableData} headers={tableHeaders} />);
    });

    const table = getByQueryId('table');
    const th = table.querySelector('thead>tr>th:nth-child(2)>div>div');
    await userEvent.click(th as Element);

    const median = screen.queryByText('median');
    expect(median).not.toBeInTheDocument();
  });
  it('should handle click outside', async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    const table = getByQueryId('table');
    const chevron = table.querySelector('thead>tr>th:first-of-type>div>svg');
    await userEvent.click(chevron as Element);

    const columnConfigText = screen.getByText('Column Configuration');
    expect(columnConfigText).toBeInTheDocument();

    const modal = getByQueryId('modal');
    expect(modal.getAttribute('data-display')).toEqual('open');

    const outside = getByQueryId('outside');
    await userEvent.click(outside as Element);
    //expect(modal.getAttribute('data-display')).toEqual('closed');
  });
  it("should handle removing a column's visibility", async () => {
    await act(async () => {
      render(<Table data={tableData} headers={tableHeaders} />);
    });

    const table = getByQueryId('table');
    const chevron = table.querySelector('thead>tr>th:first-of-type>div>svg');
    await userEvent.click(chevron as Element);

    const checkboxes = getByQueryId('checkboxes');

    const idBox = checkboxes.querySelector('div>input');
    expect(idBox as HTMLInputElement).toBeChecked();

    await userEvent.click(idBox as Element);
    expect(idBox as HTMLInputElement).not.toBeChecked();
  });
  it('should handle a sort from the modal', async () => {
    await act(async () => {
      render(<Table data={tableData} headers={tableHeaders} />);
    });

    const table = getByQueryId('table');
    const chevron = table.querySelector('thead>tr>th:first-of-type>div>svg');
    await userEvent.click(chevron as Element);

    const sortAsc = getByQueryId('sort-asc');
    await userEvent.click(sortAsc as Element);

    const sortDesc = getByQueryId('sort-desc');
    await userEvent.click(sortDesc as Element);
  });
});
