import { useContext } from 'react';
import ToastContext from '../ToastContext';
import { ToastContextValue, ToastOptions } from '../interfaces';

export const useToastImplementation = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be called withing a ToastProvider');
  }
  return context;
};

export const useToast = () => {
  const { addToast } = useToastImplementation();

  return {
    success: (message: string, options?: ToastOptions) =>
      addToast('success', message, options),
    error: (message: string, options?: ToastOptions) =>
      addToast('error', message, options),
    warning: (message: string, options?: ToastOptions) =>
      addToast('warning', message, options),
    info: (message: string, options?: ToastOptions) =>
      addToast('info', message, options),
    warn: (message: string, options?: ToastOptions) =>
      addToast('warning', message, options),
  };
};
