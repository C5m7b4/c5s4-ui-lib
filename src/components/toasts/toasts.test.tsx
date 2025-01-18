import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { act, render, screen, cleanup } from '@testing-library/react';
import { ToastProvider } from './ToastProvider';
import { getByQueryId } from '../../mocks/query';
import { useToast } from './hooks/useToast';
import userEvent from '@testing-library/user-event';

const TestApp = () => {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('success toast');
  };
  const handleWarning = () => {
    toast.warning('warning toast');
  };
  const handleError = () => {
    toast.error('error toast');
  };
  const handleInfo = () => {
    toast.info('info toast');
  };

  const handleWarningNoIcon = () => {
    toast.warn('warn toast', {
      autoClose: true,
      duration: 2000,
      useIcon: false,
    });
  };
  return (
    <div>
      <div query-id="testing-header">testing header</div>
      <div>
        <button query-id="btn-success" onClick={handleSuccess}>
          Success
        </button>
        <button query-id="btn-error" onClick={handleError}>
          Error
        </button>
        <button query-id="btn-info" onClick={handleInfo}>
          Info
        </button>
        <button query-id="btn-warning" onClick={handleWarning}>
          Warning
        </button>
        <button query-id="btn-warning-no-icon" onClick={handleWarningNoIcon}>
          Warning no icon
        </button>
      </div>
    </div>
  );
};

const Wrapper = () => {
  return (
    <div>
      <ToastProvider>
        <TestApp />
      </ToastProvider>
    </div>
  );
};

describe('toasts', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'setImmediate',
        'clearImmediate',
        'setInterval',
        'clearInterval',
        'Date',
        'nextTick',
        'hrtime',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'requestIdleCallback',
        'cancelIdleCallback',
        'performance',
        // The above excludes 'queueMicrotask'
      ],
      shouldAdvanceTime: true,
    });
    //vi.setSystemTime('2025-01-01');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    cleanup();
  });

  it('should render the ToastProvider', () => {
    render(<Wrapper />);

    const header = getByQueryId('testing-header');
    expect(header.textContent).toEqual('testing header');
  });
  it('should render a toasts', async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    const btnSuccess = getByQueryId('btn-success');
    await userEvent.click(btnSuccess);

    const successMsg = screen.getByText('success toast');
    expect(successMsg).toBeInTheDocument();

    const btnError = getByQueryId('btn-error');
    await userEvent.click(btnError);

    const errorMsg = screen.getByText('error toast');
    expect(errorMsg).toBeInTheDocument();

    const btnInfo = getByQueryId('btn-info');
    await userEvent.click(btnInfo);

    const infoMsg = screen.getByText('info toast');
    expect(infoMsg).toBeInTheDocument();

    const btnWarning = getByQueryId('btn-warning');
    await userEvent.click(btnWarning);

    const warningMsg = screen.getByText('warning toast');
    expect(warningMsg).toBeInTheDocument();
  });

  it('should remove a toast', async () => {
    await act(async () => {
      render(<Wrapper />);
    });

    const toastContainer = getByQueryId('toast-container') as HTMLDivElement;

    const btnError = getByQueryId('btn-error');
    await userEvent.click(btnError);

    const firstChild = toastContainer.querySelector('div');
    expect(firstChild).toBeInTheDocument();

    const errorMsg = screen.getByText('error toast');
    expect(errorMsg).toBeInTheDocument();

    await userEvent.click(firstChild as Element);

    await act(async () => {
      vi.advanceTimersByTime(10000);
    });

    expect(errorMsg).not.toBeInTheDocument();
  });
  it('should handle top-left position', async () => {
    await act(async () => {
      render(
        <ToastProvider position="top-left">
          <TestApp />
        </ToastProvider>,
      );
    });

    const toastContainer = getByQueryId('toast-container') as HTMLDivElement;

    const btnError = getByQueryId('btn-error');
    await userEvent.click(btnError);

    const firstChild = toastContainer.querySelector('div');
    expect(firstChild).toBeInTheDocument();

    const errorMsg = screen.getByText('error toast');
    expect(errorMsg).toBeInTheDocument();

    await userEvent.click(firstChild as Element);

    await act(async () => {
      vi.advanceTimersByTime(10000);
    });

    expect(errorMsg).not.toBeInTheDocument();
  });
  it('should handle top-left position', async () => {
    await act(async () => {
      render(
        <ToastProvider position="bottom-right">
          <TestApp />
        </ToastProvider>,
      );
    });

    const toastContainer = getByQueryId('toast-container') as HTMLDivElement;

    const btnError = getByQueryId('btn-error');
    await userEvent.click(btnError);

    const firstChild = toastContainer.querySelector('div');
    expect(firstChild).toBeInTheDocument();

    const errorMsg = screen.getByText('error toast');
    expect(errorMsg).toBeInTheDocument();

    await userEvent.click(firstChild as Element);

    await act(async () => {
      vi.advanceTimersByTime(10000);
    });

    expect(errorMsg).not.toBeInTheDocument();
  });
  it('should handle top-left position', async () => {
    await act(async () => {
      render(
        <ToastProvider
          position="bottom-left"
          autoClose={true}
          recentOnTop={true}
        >
          <TestApp />
        </ToastProvider>,
      );
    });

    const toastContainer = getByQueryId('toast-container') as HTMLDivElement;

    const btnWarn = getByQueryId('btn-warning-no-icon');
    await userEvent.click(btnWarn);

    const firstChild = toastContainer.querySelector('div');
    expect(firstChild).toBeInTheDocument();

    const errorMsg = screen.getByText('warn toast');
    expect(errorMsg).toBeInTheDocument();

    await userEvent.click(firstChild as Element);

    await act(async () => {
      vi.advanceTimersByTime(10000);
    });

    expect(errorMsg).not.toBeInTheDocument();
  });
});
