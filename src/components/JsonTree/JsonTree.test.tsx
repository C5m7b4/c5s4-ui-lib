import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import JsonTreeView from './index';
import { data } from '../../../playground/src/pages/JsonTreeViewDemo/data';

describe('JsonTreeView', () => {
  it('should render', async () => {
    render(<JsonTreeView data={data} />);
    const home = screen.getByText('light');
    expect(home).toBeInTheDocument();
  });
});
