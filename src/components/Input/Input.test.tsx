import { describe, it, vi, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '.';
import { getByQueryId } from '../../mocks/query';

describe('Input Component', () => {
  it('should render', async () => {
    const fn = vi.fn();
    render(
      <Input
        text={'test'}
        setText={fn}
        setIsSearching={fn}
        setIsClicked={fn}
      />,
    );

    const container = getByQueryId('input');
    expect(container).toBeInTheDocument();
  });

  it('should handle state on button click', async () => {
    const setText = vi.fn();
    const setIsSearching = vi.fn();
    const setIsClicked = vi.fn();

    render(
      <Input
        text={'test'}
        setText={setText}
        setIsSearching={setIsSearching}
        setIsClicked={setIsClicked}
      />,
    );

    const container = getByQueryId('input');
    expect(container).toBeInTheDocument();

    const btn = getByQueryId('search-btn');
    await userEvent.click(btn);
    
    expect(setIsSearching).toHaveBeenCalledOnce();
    expect(setIsClicked).toHaveBeenCalledOnce();
  });

  it('should handle user input', async () => {
    const setText = vi.fn();
    const setIsSearching = vi.fn();
    const setIsClicked = vi.fn();

    render(
      <Input
        text={'test'}
        setText={setText}
        setIsSearching={setIsSearching}
        setIsClicked={setIsClicked}
      />,
    );

    const container = getByQueryId('input');
    expect(container).toBeInTheDocument();

    const input = getByQueryId('text-input');
    await userEvent.type(input, 'Testing');
    expect(setText).toHaveBeenCalledTimes(7);
  });
});
