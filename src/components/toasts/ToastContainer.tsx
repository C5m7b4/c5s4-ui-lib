import { ToastContainerProps } from './interfaces';
import Toast from './Toast';

const ToastContainer = ({
  toasts,
  removeToast,
  position,
}: ToastContainerProps) => {
  let positionStyle = 'top-0 right-0';
  switch (position) {
    case 'top-left':
      positionStyle = 'top-0 left-0';
      break;
    case 'bottom-left':
      positionStyle = 'bottom-0 left-0';
      break;
    case 'bottom-right':
      positionStyle = 'bottom-0 right-0';
      break;
  }

  const handleRemoveClick = (id: string) => {
    removeToast(id);
  };

  return (
    <div query-id="toast-container" className={`fixed ${positionStyle} z-50`}>
      <>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onClick={() => handleRemoveClick(toast.id)}
            position={position}
          />
        ))}
      </>
    </div>
  );
};

export default ToastContainer;
