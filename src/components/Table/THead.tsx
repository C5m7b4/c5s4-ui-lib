import { ITableHeader } from '../../types';
import { ChevronDown } from '../../icons';
import React from 'react';
import { SortDirection } from '../../utils/sort';

export interface THeadProps {
  headers: ITableHeader[];
  backgroundColorClass?: string;
  backgroundColorStyle?: string;
  textColorClass?: string;
  textColorStyle?: string;
  onColumnClick?: (
    e: React.MouseEvent<SVGGElement>,
    header: ITableHeader,
  ) => void;
  setSortDirection: (direction: SortDirection) => void;
  sortDirection: SortDirection;
  setSelectedColumn: (header: ITableHeader) => void;
}

const THead = ({
  headers,
  backgroundColorClass = 'bg-slate-500',
  backgroundColorStyle = '',
  textColorClass = 'text-white',
  textColorStyle = '',
  onColumnClick,
  setSortDirection,
  sortDirection,
  setSelectedColumn,
}: THeadProps) => {
  const handleColumnClick = (
    e: React.MouseEvent<SVGGElement>,
    header: ITableHeader,
  ) => {
    if (onColumnClick) {
      onColumnClick(e, header);
    }
  };

  return (
    <thead
      className={`${backgroundColorClass} ${textColorClass}`}
      style={{
        backgroundColor: backgroundColorStyle ? backgroundColorStyle : '',
        color: textColorStyle ? textColorStyle : '',
        display: 'block',
        position: 'sticky',
        top: 0,
      }}
    >
      <tr>
        {headers.map((header, index) => {
          return header.visible ? (
            <th
              key={`thead-th-${index}`}
              style={{
                textAlign: header.align,
                width: `${header.width}px`,
                maxWidth: `${header.width}px`,
              }}
            >
              <div className="flex justify-between w-full pr-2 border-r pl-2">
                <div
                  className="w-full cursor-pointer"
                  onClick={() => {
                    setSelectedColumn(header);
                    setSortDirection(sortDirection == 'asc' ? 'desc' : 'asc');
                  }}
                >
                  {header.alias}
                </div>

                <ChevronDown
                  onClick={(e) => handleColumnClick(e, header)}
                  height={12}
                  width={12}
                  fill="white"
                  stroke="white"
                  strokeWidth={6}
                  className="cursor-pointer"
                />
              </div>
            </th>
          ) : null;
        })}
      </tr>
    </thead>
  );
};

export default THead;
