import { render, fireEvent } from '@testing-library/react';
import SplitContainer from './index';
import { describe, it } from 'vitest';
import { getByQueryId } from '../../mocks/query';

describe('SplitContainer', () => {
  it('should render horizontally', () => {
    render(
      <SplitContainer
        firstChild={<div>First</div>}
        secondChild={<div>Second</div>}
        direction="horizontal"
      />,
    );
  });
  it('should render vertically', () => {
    render(
      <SplitContainer
        firstChild={<div>First</div>}
        secondChild={<div>Second</div>}
        direction="vertical"
      />,
    );
  });
  it('should handle drag vertically', async () => {
    render(
      <SplitContainer
        firstChild={<div>First</div>}
        secondChild={<div>Second</div>}
        direction="vertical"
      />,
    );

    const divider = getByQueryId('divider') as HTMLDivElement;
    await fireEvent.mouseDown(divider, { clientY: 100 });
    await fireEvent.mouseMove(document, { clientY: 150 });
    await fireEvent.mouseUp(document);
  });
  it('should handle drag horizontally', async () => {
    render(
      <SplitContainer
        firstChild={<div>First</div>}
        secondChild={<div>Second</div>}
        direction="horizontal"
      />,
    );

    const divider = getByQueryId('divider') as HTMLDivElement;
    await fireEvent.mouseDown(divider, { clientX: 100 });
    await fireEvent.mouseMove(document, { clientX: 150 });
    await fireEvent.mouseUp(document);
  });
});
