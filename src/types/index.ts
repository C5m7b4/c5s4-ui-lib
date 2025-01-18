import { FormatterType } from '../components/Table/formatters';
import React from 'react';

export interface IconProps {
  height: number;
  width: number;
  fill: string;
  stroke: string;
  strokeWidth?: number;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGGElement>) => void;
}

export type ITableHeaderAlign = 'left' | 'center' | 'right';
export type IDataType = 'string' | 'number' | 'boolean' | 'date';

export interface ITableHeader {
  column: string;
  alias: string;
  visible: boolean;
  renderer: () => void;
  width: number;
  align: ITableHeaderAlign;
  formatter: FormatterType;
  dataType: IDataType;
}
