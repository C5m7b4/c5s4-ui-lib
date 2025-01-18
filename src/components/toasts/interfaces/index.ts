import { ToastAnimationType, ToastPosition, ToastType } from '../types';
import { ReactNode } from 'react';

export interface ToastProviderProps {
  children?: ReactNode;
  autoClose?: boolean;
  duration?: number;
  position?: ToastPosition;
  recentOnTop?: boolean;
}

export interface ToastOptions {
  useIcon?: boolean;
  autoClose?: boolean;
  duration?: number;
  animationType?: ToastAnimationType;
}

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  options?: ToastOptions;
}

export interface ToastContextValue {
  addToast: (type: ToastType, message: string, options?: ToastOptions) => void;
  removeToast: (id: string) => void;
}

export interface ToastContainerProps {
  toasts: ToastProps[];
  removeToast: (id: string) => void;
  position: ToastPosition;
}
