import { useState } from 'react';
import { ToastPosition, ToastProvider } from '../../../../src';
import Content from './Content';

const Wrapper = () => {
  const [autoClose, setAutoClose] = useState(true);
  const [duration, setDuration] = useState(5000);
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [recentOnTop, setRecentOnTop] = useState(false);

  return (
    <ToastProvider
      autoClose={autoClose}
      duration={duration}
      position={position}
      recentOnTop={recentOnTop}
    >
      <Content
        autoClose={autoClose}
        setAutoClose={setAutoClose}
        duration={duration}
        setDuration={setDuration}
        position={position}
        setPosition={setPosition}
        recentOnTop={recentOnTop}
        setRecentOnTop={setRecentOnTop}
      />
    </ToastProvider>
  );
};

export default Wrapper;
