import { ITableHeader } from '../../types';
import { useEffect } from 'react';
import { StringEditor } from './editors';
import { TablePluginType } from '../../../src';

export interface TBodyProps<T> {
  data: T[];
  headers: ITableHeader[];
  maxHeight?: number;
  hoverClass?: string;
  striped?: boolean;
  stripeEvenClass?: string;
  stripeOddClass?: string;
  textColorClass2?: string;
  editable: boolean;
  setEditable: (editable: boolean) => void;
  editableRowId: number;
  setEditableRowId: (editableRowId: number) => void;
  setTableData?: (data: T[]) => void;
  editableHeader?: ITableHeader | null;
  setEditableHeader?: (header: ITableHeader | null) => void;
  tablePluginType?: TablePluginType;
}

const TBody = <T,>({
  data,
  headers,
  maxHeight = 350,
  hoverClass = 'hover:bg-blue-200',
  striped = true,
  stripeEvenClass = 'even:bg-slate-200',
  stripeOddClass = 'odd:bg-white',
  textColorClass2 = 'text-black',
  editable,
  setEditable,
  editableRowId,
  setEditableRowId,
  setTableData,
  editableHeader,
  setEditableHeader,
  tablePluginType,
}: TBodyProps<T>) => {
  const stripeStyle = striped ? `${stripeEvenClass} ${stripeOddClass}` : '';

  useEffect(() => {}, []);

  const getFormatter = (header: ITableHeader, record: T) => {
    if (header.formatter) {
      return header.formatter(String(record[header.column as keyof T]));
    } else {
      return String(record[header.column as keyof T]);
    }
  };

  const handleDoubleClick = (index: number, header: ITableHeader) => {
    setEditable(!editable);
    setEditableRowId(index);
    if (setEditableHeader) {
      setEditableHeader(header);
    }
  };

  const handleStringCellEdit = (
    value: string,
    header: ITableHeader,
    rowId: number,
  ) => {
    // merge this back in with our data somehow
    const dataCopy = [...data];
    const selectedRow = data[rowId];
    const newRow = { ...selectedRow, [header.column]: value };
    dataCopy.splice(rowId, 1, newRow);
    if (setTableData) {
      setTableData(dataCopy);
    }
    if (tablePluginType === 'cellEditingPlugin') {
      setEditable(false);
    }
  };

  const renderCell = (
    header: ITableHeader,
    record: T,
    index: number,
    hIdx: number,
  ) => {
    let isEditable = false;
    if (editable && header.editable && editableRowId === index) {
      isEditable = true;
      if (
        tablePluginType === 'cellEditingPlugin' &&
        editableHeader?.column !== header.column
      ) {
        isEditable = false;
      }
    }

    if (isEditable) {
      return (
        <td
          className={`pl-2 text-ellipsis overflow-hidden whitespace-nowrap ${textColorClass2}`}
          key={`tr-td-${index}-${hIdx}`}
          style={{
            textAlign: header.align,
            width: `${header.width}px`,
            maxWidth: `${header.width}px`,
          }}
        >
          {header.dataType === 'string' ? (
            <StringEditor
              header={header}
              defaultValue={record[header.column as keyof T] as string}
              onFinishEditing={(v, h) => handleStringCellEdit(v, h, index)}
            />
          ) : null}
        </td>
      );
    }

    return (
      <td
        onDoubleClick={() => handleDoubleClick(index, header)}
        className={`pl-2 text-ellipsis overflow-hidden whitespace-nowrap ${textColorClass2}`}
        key={`tr-td-${index}-${hIdx}`}
        style={{
          textAlign: header.align,
          width: `${header.width}px`,
          maxWidth: `${header.width}px`,
        }}
      >
        {getFormatter(header, record)}
      </td>
    );
  };

  return (
    <tbody
      className="no-scrollbar"
      style={{
        maxHeight: `${maxHeight}px`,
        overflowY: 'scroll',
        display: 'block',
      }}
    >
      {data.map((record, index) => {
        return (
          <tr
            key={`tr-${index}`}
            className={`${hoverClass ? hoverClass : ''} transition-all duration-500 cursor-pointer ${stripeStyle}`}
          >
            {headers.map((header, idx) =>
              renderCell(header, record, index, idx),
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TBody;
