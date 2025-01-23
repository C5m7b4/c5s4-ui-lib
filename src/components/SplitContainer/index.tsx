import React, { useState, useEffect, useRef } from 'react';

export interface SplitContainerProps {
  firstChild: React.ReactNode;
  secondChild: React.ReactNode;
  direction: 'horizontal' | 'vertical';
  parentWidth?: number;
  dividerColor?: string;
}

const SplitContainer = ({
  firstChild,
  secondChild,
  direction,
  parentWidth = 50,
  dividerColor = '#b18f8f',
}: SplitContainerProps) => {
  const [dividerPosition, setDividerPosition] = useState(parentWidth);
  const [isResizing, setIsResizing] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const container = document.querySelector(
        '[query-id="split-horizontal-container"]',
      );
      if (container) {
        const rect = container.getBoundingClientRect();
        if (direction == 'horizontal') {
          const newDividerPosition =
            ((e.clientX - rect.left) / rect.width) * 100;
          setDividerPosition(newDividerPosition);
        } else {
          const newDividerPosition =
            ((e.clientY - rect.top) / rect.height) * 100;
          setDividerPosition(newDividerPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    getDimensions();
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const getDimensions = () => {
    if (!ref.current || !dividerRef.current) return;

    // const parent = ref.current.parentElement;
    // if (parent) {
    //   const box = parent.getBoundingClientRect();
    //   const offset = 50;
    //   if (box) {
    //     if (direction == 'horizontal') {
    //       ref.current.style.height =
    //         window.innerHeight - box.bottom - offset + 'px';
    //       dividerRef.current.style.height =
    //         window.innerHeight - box.bottom - offset + 'px';
    //     } else {
    //       ref.current.style.width = box.width + 'px';
    //       dividerRef.current.style.width = box.width + 'px';
    //     }
    //   }
    // }
  };

  const getDividerStyle = () => {
    if (direction === 'horizontal') {
      return {
        left: `${dividerPosition}%`,
        width: '8px',
        opacity: '0.8',
        zIndex: '50',
        backgroundColor: dividerColor,
      };
    } else {
      return {
        top: `${dividerPosition}%`,
        height: '8px',
        opacity: '0.8',
        zIndex: '50',
        backgroundColor: dividerColor,
      };
    }
  };

  const getFirstStyle = () => {
    if (direction == 'horizontal') {
      return { width: `${dividerPosition}%` };
    } else {
      return { height: `${dividerPosition}%` };
    }
  };

  const getSecondStyle = () => {
    if (direction == 'horizontal') {
      return { width: `${50 - dividerPosition}%` };
    } else {
      return { height: `${50 - dividerPosition}%` };
    }
  };

  return (
    <div
      ref={ref}
      query-id="split-horizontal-container"
      className={`split-horizontal-container ${direction == 'horizontal' ? 'flex' : 'flex flex-col'} relative 
      w-full overflow-y-hidden overflow-x-hidden min-h-[350px] border rounded-lg shadow-md`}
    >
      <div className="split-container-first w-full" style={getFirstStyle()}>
        {firstChild}
      </div>
      <div
        query-id="divider"
        ref={dividerRef}
        className={`divider absolute w-full ${direction === 'horizontal' ? 'cursor-col-resize' : 'cursor-row-resize'} h-full`}
        onMouseDown={handleMouseDown}
        style={getDividerStyle()}
      ></div>
      <div
        className="split-container-bottom flex-1 w-full"
        style={getSecondStyle()}
      >
        {secondChild}
      </div>
    </div>
  );
};

export default SplitContainer;
