import { IconProps } from '../types';
import React from 'react';

const ChevronDown = ({
  height,
  width,
  fill = '#000',
  stroke = '#000',
  className,
  onClick,
  style,
}: IconProps) => {
  return (
    <svg
      onClick={(e: React.MouseEvent<SVGGElement>) => {
        if (onClick) {
          onClick(e);
        }
      }}
      style={style}
      fill={fill}
      stroke={stroke}
      height={`${height}px`}
      width={`${width}px`}
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 407.437 407.437"
    >
      <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 " />
    </svg>
  );
};

export default ChevronDown;
