import { IconProps } from '../types';
import React from 'react';

const TriangleDown = ({
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
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 512 512"
    >
      <polygon points="472.4 256 261.8 342.1 81.8 481.5 112.6 256 81.8 30.5 261.8 169.9 472.4 256" />
    </svg>
  );
};

export default TriangleDown;
