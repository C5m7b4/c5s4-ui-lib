import { ITableHeader } from '../../types';
import THead from './THead';
import TBody from './TBody';
import React, { useState, useEffect } from 'react';
import { sort, SortDirection } from '../../utils/sort';
import Footer from './Footer';
import ColumnConfigModal from './modals/ColumnConfigModal';
import { TableProvider } from './TableProvider';
import { TablePluginType } from './types';

export interface ITable<T> {
  data: T[];
  headers: ITableHeader[];
  backgroundColorClass?: string;
  backgroundColorStyle?: string;
  textColorClass?: string;
  textColorStyle?: string;
  footerBackgroundClass?: string;
  footerBackgroundColorStyle?: string;
  footerTextColorClass?: string;
  footerTextColorStyle?: string;
  hoverClass?: string;
  striped?: boolean;
  stripeEvenClass?: string;
  stripeOddClass?: string;
  textColorClass2?: string;
  tablePluginType?: TablePluginType;
}

const Table = <T,>({
  data,
  headers,
  backgroundColorClass,
  backgroundColorStyle,
  textColorClass,
  textColorStyle,
  footerBackgroundClass,
  footerBackgroundColorStyle,
  footerTextColorClass,
  footerTextColorStyle,
  hoverClass,
  striped,
  stripeEvenClass,
  stripeOddClass,
  textColorClass2,
  tablePluginType,
}: ITable<T>) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [tableData, setTableData] = useState(data);
  const [tableHeaders, setTableHeaders] = useState<ITableHeader[]>(headers);
  const [selectedColumn, setSelectedColumn] = useState<ITableHeader | null>(
    null,
  );
  const [showColumnConfigModal, setShowColumnConfigModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [editable, setEditable] = useState(false);
  const [editableRowId, setEditableRowId] = useState<number>(-1);
  const [editableHeader, setEditableHeader] = useState<ITableHeader | null>(
    null,
  );

  useEffect(() => {}, [tableData]);

  const handleColumnClick = (
    e: React.MouseEvent<SVGGElement>,
    header: ITableHeader,
  ) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setSelectedColumn(header);
    setShowColumnConfigModal(true);
  };

  const basicSort = (header: ITableHeader) => {
    if (header.dataType !== 'number') {
      setSelectedColumn(null);
    } else {
      setSelectedColumn(header);
    }
    const sortedData = sort(
      data,
      header.column as keyof T,
      sortDirection,
      header,
    );
    //setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setTableData(sortedData);
  };

  useEffect(() => {
    if (selectedColumn) {
      basicSort(selectedColumn as ITableHeader);
    }
  }, [sortDirection]);

  return (
    <div>
      <TableProvider>
        <table query-id="table" className="w-full">
          <THead
            headers={tableHeaders}
            backgroundColorClass={backgroundColorClass}
            backgroundColorStyle={backgroundColorStyle}
            textColorClass={textColorClass}
            textColorStyle={textColorStyle}
            onColumnClick={handleColumnClick}
            setSortDirection={setSortDirection}
            sortDirection={sortDirection}
            setSelectedColumn={setSelectedColumn}
            textColorClass2={textColorClass2}
            setTableHeaders={setTableHeaders}
          />
          <TBody
            data={tableData}
            setTableData={setTableData}
            headers={tableHeaders}
            hoverClass={hoverClass}
            striped={striped}
            stripeEvenClass={stripeEvenClass}
            stripeOddClass={stripeOddClass}
            textColorClass2={textColorClass2}
            editable={editable}
            setEditable={setEditable}
            editableRowId={editableRowId}
            setEditableRowId={setEditableRowId}
            editableHeader={editableHeader}
            setEditableHeader={setEditableHeader}
            tablePluginType={tablePluginType}
          />
          <Footer
            data={data}
            selectedColumn={selectedColumn}
            footerBackgroundClass={footerBackgroundClass}
            footerTextColorClass={footerTextColorClass}
            footerBackgroundColorStyle={footerBackgroundColorStyle}
            footerTextColorStyle={footerTextColorStyle}
          />
        </table>
        <ColumnConfigModal
          open={showColumnConfigModal}
          close={() => {
            setShowColumnConfigModal(false);
          }}
          position={position}
          headers={tableHeaders}
          setTableHeaders={setTableHeaders}
          // selectedHeader={selectedColumn}
          setSortDirection={setSortDirection}
        />
      </TableProvider>
    </div>
  );
};

export default Table;
