import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TooltipContextType {
  showTooltip: (content: string, x: number, y: number) => void;
  hideTooltip: () => void;
}

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
const TooltipContext = createContext<TooltipContextType | null>(null);

export const TooltipProvider = ({ children }: { children: ReactNode }) => {
  const [tooltip, setTooltip] = useState<{
    content: string;
    x: number;
    y: number;
  } | null>(null);

  const showTooltip = (content: string, x: number, y: number) => {
    setTooltip({ content, x, y });
  };

  const hideTooltip = () => {
    setTooltip(null);
  };

  return (
    <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
      {children}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            top: tooltip.y,
            left: tooltip.x,
            background: 'black',
            color: 'white',
            padding: '5px',
            borderRadius: '3px',
            pointerEvents: 'none',
          }}
        >
          {tooltip.content}
        </div>
      )}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error('useTooltip must be used within a tooltip provider');
  }
  return context;
};
