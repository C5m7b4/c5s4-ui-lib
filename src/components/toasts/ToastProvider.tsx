import { useState } from 'react';
import { ToastProps, ToastOptions, ToastProviderProps } from './interfaces';
import { ToastType } from './types';
import ToastContext from './ToastContext';
import { getByQueryId } from '../../utils';

import ToastContainer from './ToastContainer';

export const ToastProvider = ({
  children,
  autoClose,
  duration,
  position = 'top-right',
  recentOnTop = false,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (
    type: ToastType,
    message: string,
    options?: ToastOptions,
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    if (autoClose) {
      options = { ...options, autoClose: autoClose, duration: duration };
    }

    setToasts((prev) => {
      if (recentOnTop) {
        return [{ id, type, message, options }, ...prev];
      } else {
        return [...prev, { id, type, message, options }];
      }
    });

    if (autoClose) {
      setTimeout(() => {
        removeToast(id);
      }, duration || 5000);
    }
    if (options?.autoClose) {
      setTimeout(() => {
        removeToast(id);
      }, options.duration || 5000);
    }
  };

  const getVisibleItems = (parent: HTMLDivElement) => {
    const children = Array.from(parent.children) as HTMLDivElement[];
    return children.filter((child) => {
      const style = window.getComputedStyle(child);
      return style.opacity === '1';
    });
  };

  const removeToast = (id: string) => {
    const div = getByQueryId(id);
    const toastContainer = getByQueryId('toast-container');
    if (div) {
      switch (position) {
        case 'top-right':
          div.classList.remove('animate-slideInFromRight');
          div.classList.add('animate-slideOutToRight');
          break;
        case 'top-left':
          div.classList.remove('animate-slideInFromLeft');
          div.classList.add('animate-slideOutToLeft');
          break;
        case 'bottom-right':
          div.classList.remove('animate-slideInFromRight');
          div.classList.add('animate-slideOutToRight');
          break;
        case 'bottom-left':
          div.classList.remove('animate-slideInFromLeft');
          div.classList.add('animate-slideOutToLeft');
      }
    }
    setTimeout(() => {
      const children = getVisibleItems(toastContainer);
      if (children.length > 0) {
        children[0].style.marginTop = '-75px';
      }
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 5000);
    }, 450);
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer
        toasts={toasts}
        removeToast={removeToast}
        position={position}
      />
    </ToastContext.Provider>
  );
};
