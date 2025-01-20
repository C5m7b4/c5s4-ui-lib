import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CodeCell from './index';
import { getByQueryId } from '../../mocks/query';
import userEvent from '@testing-library/user-event';

const codeGenerator = () => {
  return `const x = 12`;
};

describe('CodeCell', () => {
  it('should render', async () => {
    render(<CodeCell title="codecell" codeGenerator={codeGenerator} />);

    const title = screen.getByText('codecell');
    expect(title).toBeInTheDocument();
  });
  it('should handle trigger click', async () => {
    render(<CodeCell title="codecell" codeGenerator={codeGenerator} />);

    const text = screen.getByText('const x = 12');
    expect(text).toBeInTheDocument();

    const trigger = getByQueryId('trigger');
    await userEvent.click(trigger);

    await userEvent.click(trigger);
  });
});
