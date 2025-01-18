import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '.';
import { getByQueryId } from '../../mocks/query';
import { data } from '../../../playground/src/data';

const Wrapper = () => {
  const fn = vi.fn();
  return (
    <div query-id="outside">
      <Select data={data} displayKey="name" label="select user" onSelect={fn} />
    </div>
  );
};

describe('Select Component', () => {
  it('should render', async () => {
    const fn = vi.fn();
    render(
      <Select
        data={data}
        displayKey="name"
        label="select user"
        onSelect={fn}
      />,
    );

    const label = getByQueryId('label');
    expect(label.textContent).toEqual('select user');
  });
  it('should handle the trigger click', async () => {
    const fn = vi.fn();
    render(
      <Select
        data={data}
        displayKey="name"
        label="select user"
        onSelect={fn}
      />,
    );

    const trigger = getByQueryId('trigger');
    await userEvent.click(trigger);

    // check that options are showing
    const list = getByQueryId('list');
    expect(list.getAttribute('data-display')).toEqual('open');
    expect(list.childNodes.length).toEqual(data.length);
    await userEvent.click(trigger);
  });
  it('should handle click outside', async () => {
    render(<Wrapper />);

    const trigger = getByQueryId('trigger');
    await userEvent.click(trigger);
    const list = getByQueryId('list');

    expect(list.getAttribute('data-display')).toEqual('open');

    const outside = getByQueryId('outside');
    await userEvent.click(outside);
    expect(list.getAttribute('data-display')).toEqual('closed');
  });
  it('should handle selecting an option', async () => {
    const fn = vi.fn();
    render(
      <Select
        data={data}
        displayKey="name"
        label="select user"
        onSelect={fn}
      />,
    );

    const trigger = getByQueryId('trigger');
    await userEvent.click(trigger);

    const option = getByQueryId('option-1');
    await userEvent.click(option);

    const input = getByQueryId('input') as HTMLInputElement;
    expect(input.value).toEqual(data[1].name);
  });
  it('should handle a query', async () => {
    const fn = vi.fn();
    render(
      <Select
        data={data}
        displayKey="name"
        label="select user"
        onSelect={fn}
      />,
    );

    const trigger = getByQueryId('trigger');
    await userEvent.click(trigger);

    const input = getByQueryId('input') as HTMLInputElement;

    await userEvent.type(input, 'tec');
    const list = getByQueryId('list');
    expect(list.childNodes.length).toEqual(2);
  });
  it('should handle label position', async () => {
    const fn = vi.fn();
    render(
      <Select
        data={data}
        displayKey="name"
        label="select user"
        onSelect={fn}
        labelPosition="left"
      />,
    );
  });
  it('should handle a missing listRef', async () => {
    render(<Wrapper />);

    const list = getByQueryId('list');
    list.remove();

    const trigger = getByQueryId('trigger');
    await userEvent.click(trigger);

    const outside = getByQueryId('outside');
    await userEvent.click(outside);
  });
  it('should handle a missing triggerRef', async () => {
    render(<Wrapper />);

    const list = getByQueryId('list');
    list.remove();

    const triggerRef = getByQueryId('trigger-ref');

    const trigger = getByQueryId('trigger');
    await userEvent.click(trigger);

    triggerRef.remove();

    const outside = getByQueryId('outside');
    await userEvent.click(outside);
  });
  it('should handle missing onSelect', async () => {
    render(
      // @ts-expect-error missing select
      <Select
        data={data}
        displayKey="name"
        label="select user"
        labelPosition="left"
      />,
    );

    const trigger = getByQueryId('trigger');
    await userEvent.click(trigger);

    const option = getByQueryId('option-1');
    await userEvent.click(option);
  });
});
