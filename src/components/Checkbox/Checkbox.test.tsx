import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Checkbox from '.';
import { getByQueryId } from '../../mocks/query';

describe('Checkbox Component', () => {
  it('should render', () => {
    render(<Checkbox />);

    const container = getByQueryId('checkbox-container');
    expect(container).toBeInTheDocument();
  });
});