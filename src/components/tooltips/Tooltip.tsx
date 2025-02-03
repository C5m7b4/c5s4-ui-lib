import React, { useState } from 'react';

type TooltipProps = {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex items-center justify-center group">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={`absolute whitespace-nowrap px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-md transition-opacity duration-200 opacity-100 ${
            placement === 'top'
              ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
              : placement === 'bottom'
                ? 'top-full left-1/2 transform -translate-x-1/2 mt-2'
                : placement === 'left'
                  ? 'right-full top-1/2 transform -translate-y-1/2 mr-2'
                  : 'left-full top-1/2 transform -translate-y-1/2 ml-2'
          }`}
        >
          {content}
          <div
            className={`absolute w-0 h-0 border-transparent border-solid ${
              placement === 'top'
                ? 'border-t-gray-800 border-t-8 left-1/2 transform -translate-x-1/2 top-full'
                : placement === 'bottom'
                  ? 'border-b-gray-800 border-b-8 left-1/2 transform -translate-x-1/2 bottom-full'
                  : placement === 'left'
                    ? 'border-l-gray-800 border-l-8 top-1/2 transform -translate-y-1/2 right-full'
                    : 'border-r-gray-800 border-r-8 top-1/2 transform -translate-y-1/2 left-full'
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
