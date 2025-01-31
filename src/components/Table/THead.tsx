import { ITableHeader } from '../../types';
import { ChevronDown } from '../../icons';
import React, { useState, useEffect, useRef } from 'react';
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
  textColorClass2?: string;
  setTableHeaders: (headers: ITableHeader[]) => void;
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
  textColorClass2,
  setTableHeaders,
}: THeadProps) => {
  const [draggingColumn, setDraggingColumn] = useState<ITableHeader | null>(
    null,
  );
  const ref = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    getFlexWidth();
  }, [headers]);

  const handleColumnClick = (
    e: React.MouseEvent<SVGGElement>,
    header: ITableHeader,
  ) => {
    if (onColumnClick) {
      onColumnClick(e, header);
    }
  };

  const handleResize = (header: ITableHeader, newWidth: number) => {
    header.width = newWidth;
    const copy = [...headers];
    const index = copy.findIndex((h) => h.alias === header.alias);
    copy.splice(index, 1, header);
    setTableHeaders(copy);
  };

  const startResizing = (
    header: ITableHeader,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!ref.current) return;
    const parent = ref.current.parentElement;
    const box = parent?.getBoundingClientRect();
    if (!box) return;

    const startX = e.clientX - box.left;
    const startWidth = header.width as number;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(
        50,
        startWidth + (e.clientX - box.left - startX),
      );
      handleResize(header, newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleDragStart = (
    header: ITableHeader,
    e: React.DragEvent<HTMLTableSectionElement>,
  ) => {
    e.dataTransfer.setData('text/plain', header.alias);
    setDraggingColumn(header);
  };

  const handleDragOver = (
    header: ITableHeader,
    e: React.DragEvent<HTMLTableSectionElement>,
  ) => {
    if (draggingColumn?.alias === header.alias) return;
    if (!ref.current) return;

    const box = e.currentTarget.getBoundingClientRect();
    const currentPosition = e.clientX;
    if (currentPosition > box.left && currentPosition < box.left + box.width) {
      e.preventDefault();
      e.currentTarget.classList.add('bg-green-500');
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTableSectionElement>) => {
    e.currentTarget.classList.remove('bg-green-500');
  };

  const handleDrop = (
    header: ITableHeader,
    e: React.DragEvent<HTMLTableSectionElement>,
  ) => {
    e.currentTarget.classList.remove('bg-green-500');
    const copy = headers.filter((h) => h.alias !== draggingColumn?.alias);
    const index = headers.findIndex((h) => h.alias === header.alias);
    copy.splice(index, 0, draggingColumn as ITableHeader);

    setTableHeaders(copy);
  };

  const getFlexWidth = () => {
    if (!ref.current) return;
    const flexHeader = headers.filter((h) => h.width === 'flex')[0];
    if (!flexHeader) return;
    const otherColumns = headers.filter((h) => h.alias !== flexHeader.alias);
    const widths = otherColumns.reduce((acc, cur) => {
      return acc + (cur.width as number);
    }, 0);

    const parent = ref.current.parentElement;
    if (!parent) return;
    const box = parent.getBoundingClientRect();
    const newWidth = box.width - widths;

    flexHeader.width = newWidth;
    const copy = [...headers];
    const index = copy.findIndex((h) => h.alias === flexHeader.alias);
    copy.splice(index, 1, flexHeader);
    setTableHeaders(copy);
  };

  return (
    <thead
      ref={ref}
      className={`${backgroundColorClass} ${textColorClass} rounded-t-lg border`}
      style={{
        backgroundColor: backgroundColorStyle ? backgroundColorStyle : '',
        color: textColorStyle ? textColorStyle : '',
        display: 'block',
        position: 'sticky',
        top: 0,
      }}
    >
      <tr className="w-full rounded-t-lg">
        {headers.map((header, index) => {
          return header.visible ? (
            <th
              className={`relative`}
              key={`thead-th-${index}`}
              style={{
                textAlign: header.align,
                width: `${header.width === 'flex' ? '' : header.width}px`,
                // maxWidth: `${header.width}px`,
              }}
            >
              <div className="flex justify-between w-full border-r pl-2">
                <div
                  draggable
                  className="w-full cursor-pointer"
                  onDragStart={(e) =>
                    handleDragStart(
                      header,
                      e as React.DragEvent<HTMLTableSectionElement>,
                    )
                  }
                  onDragOver={(e) =>
                    handleDragOver(
                      header,
                      e as React.DragEvent<HTMLTableSectionElement>,
                    )
                  }
                  onDragLeave={handleDragLeave}
                  onDrop={(e) =>
                    handleDrop(
                      header,
                      e as React.DragEvent<HTMLTableSectionElement>,
                    )
                  }
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
                  fill={textColorClass2 || '#000'}
                  stroke={textColorClass2 || '#000'}
                  strokeWidth={6}
                  className="cursor-pointer"
                />
                <div
                  className="w-[10px]  cursor-col-resize"
                  onMouseDown={(e) => startResizing(header, e)}
                ></div>
              </div>
            </th>
          ) : null;
        })}
      </tr>
    </thead>
  );
};

export default THead;
