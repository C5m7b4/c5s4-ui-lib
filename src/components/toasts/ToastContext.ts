import { createContext } from 'react';
import { ToastContextValue } from './interfaces';

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export default ToastContext;
