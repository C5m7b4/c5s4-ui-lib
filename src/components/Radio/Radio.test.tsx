import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Radio from '.';
import { getByQueryId } from '../../mocks/query';

describe('Radio Component', () => {
  it('should render', () => {
    render(<Radio />);

    const container = getByQueryId('radio-container');
    expect(container).toBeInTheDocument();
  });
});
