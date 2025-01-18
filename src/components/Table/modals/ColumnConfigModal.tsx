import { createPortal } from 'react-dom';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { ITableHeader } from '../../../types';
import React from 'react';
import { SortDirection } from '../../../utils/sort';

interface ColumnConfigModalProps {
  open: boolean;
  close: () => void;
  position: { x: number; y: number };
  headers: ITableHeader[];
  setTableHeaders: (headers: ITableHeader[]) => void;
  setSortDirection: (direction: SortDirection) => void;
}

const ColumnConfigModal = ({
  open,
  close,
  position,
  headers,
  setTableHeaders,
  setSortDirection,
}: ColumnConfigModalProps) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (!ref.current) return;
    ref.current.setAttribute('data-display', 'closed');

    setTimeout(() => {
      close();
    }, 500);
  });

  const handleClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    header: ITableHeader,
  ) => {
    const copy = [...headers];
    const idx = copy.findIndex((h) => h.column === header.column);
    const record = copy.find((h) => h.column === header.column);
    if (record) {
      record.visible = e.target.checked;
      copy.splice(idx, 1, record);
      setTableHeaders(copy);
    }
  };

  const handleSort = (direction: SortDirection) => {
    setSortDirection(direction);
  };

  return open
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10">
          <div
            query-id="modal"
            ref={ref}
            data-display="open"
            className="fixed bg-white p-4 rounded-lg z-20 shadow-md 
                data-[display=closed]:animate-fadeOutModal
                data-[display=open]:animate-fadeInModal
                "
            style={{ top: position.y, left: position.x }}
          >
            <div className="flex flex-col justify-between items-center mb-4">
              <div className="text-xl font-bold border-b">
                Column Configuration
              </div>
              <div className="text-left w-full mb-2 border-b py-2">
                <div
                  query-id="sort-asc"
                  className="cursor-pointer"
                  onClick={() => handleSort('asc')}
                >
                  Sort Ascending
                </div>
                <div
                  query-id="sort-desc"
                  className="cursor-pointer"
                  onClick={() => handleSort('desc')}
                >
                  Sort Descending
                </div>
              </div>

              <div query-id="checkboxes" className="w-full px-4">
                {headers.map((header, idx) => {
                  return (
                    <div
                      key={`header-${idx}`}
                      className="flex justify-between w-full"
                    >
                      <div>{header.alias}</div>
                      <input
                        type="checkbox"
                        checked={header.visible}
                        onChange={(e) => handleClick(e, header)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default ColumnConfigModal;
