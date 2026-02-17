import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from './ToastContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Helper component to access toast context
function TestConsumer() {
  const toast = useToast();
  return (
    <div>
      <button onClick={() => toast.success('Success!')}>Add Success</button>
      <button onClick={() => toast.error('Error!')}>Add Error</button>
      <button onClick={() => toast.info('Info!')}>Add Info</button>
    </div>
  );
}

describe('ToastContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('throws error when useToast is used outside ToastProvider', () => {
    // Suppress console.error for expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestConsumer />);
    }).toThrow('useToast must be used within a ToastProvider');

    spy.mockRestore();
  });

  it('renders success toast with correct message', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Success'));
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('renders error toast with correct message', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Error'));
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('renders info toast with correct message', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Info'));
    expect(screen.getByText('Info!')).toBeInTheDocument();
  });

  it('auto-removes toast after 4 seconds', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Success'));
    expect(screen.getByText('Success!')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });

  it('supports multiple toasts simultaneously', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Success'));
    fireEvent.click(screen.getByText('Add Error'));

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('removes toast when close button is clicked', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Success'));
    expect(screen.getByText('Success!')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /fermer la notification/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });

  it('has accessible region with aria-live', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    const region = screen.getByRole('region', { name: /notifications/i });
    expect(region).toHaveAttribute('aria-live', 'polite');
  });

  it('removes only the clicked toast, not others', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Success'));
    fireEvent.click(screen.getByText('Add Error'));

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Error!')).toBeInTheDocument();

    const closeBtns = screen.getAllByRole('button', { name: /fermer la notification/i });
    fireEvent.click(closeBtns[0]);

    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('auto-removes error toast after 4 seconds', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Error'));
    expect(screen.getByText('Error!')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByText('Error!')).not.toBeInTheDocument();
  });

  it('auto-removes info toast after 4 seconds', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Info'));
    expect(screen.getByText('Info!')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByText('Info!')).not.toBeInTheDocument();
  });

  it('toast is still visible before 4 seconds', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Success'));

    act(() => {
      vi.advanceTimersByTime(3900);
    });

    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('can display 3 toasts simultaneously', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Success'));
    fireEvent.click(screen.getByText('Add Error'));
    fireEvent.click(screen.getByText('Add Info'));

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Info!')).toBeInTheDocument();
  });

  it('each toast has a close button', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Add Success'));
    fireEvent.click(screen.getByText('Add Error'));

    const closeBtns = screen.getAllByRole('button', { name: /fermer la notification/i });
    expect(closeBtns.length).toBe(2);
  });
});
