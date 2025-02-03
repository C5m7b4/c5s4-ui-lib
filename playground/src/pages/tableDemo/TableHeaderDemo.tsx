import { CodeCell } from '../../../../src';

const TableHeaderDemo = () => {
  const generateTableHeaders = () => {
    return `
            export const tableHeaders: ITableHeader[] = [
              {
                column: 'index',
                alias: 'ID',
                visible: true,
                renderer: () => {},
                width: 100,
                align: 'left',
                formatter: null,
                dataType: 'number',
              },
              {
                column: 'isActive',
                alias: 'Active',
                visible: true,
                renderer: () => {},
                width: 100,
                align: 'left',
                formatter: null,
                dataType: 'boolean',
                editable: false,
              },
              {
                column: 'price',
                alias: 'Price',
                visible: true,
                renderer: () => {},
                width: 100,
                align: 'center',
                formatter: numberFormatter,
                dataType: 'number',
                editable: true,
              },
              {
                column: 'cost',
                alias: 'Cost',
                visible: true,
                renderer: () => {},
                width: 100,
                align: 'center',
                formatter: numberFormatter,
                dataType: 'number',
              },
              {
                column: 'picture',
                alias: 'Picture',
                visible: true,
                renderer: () => {},
                width: 100,
                align: 'left',
                formatter: imageFormatter,
                dataType: 'string',
              },
              {
                column: 'upc',
                alias: 'UPC',
                visible: true,
                renderer: () => {},
                width: 100,
                align: 'left',
                formatter: null,
                dataType: 'string',
                editable: true,
              },
              {
                column: 'department',
                alias: 'Dept',
                visible: true,
                renderer: () => {},
                width: 100,
                align: 'left',
                formatter: null,
                dataType: 'string',
                editable: true,
              },
              {
                column: 'description',
                alias: 'Name',
                visible: true,
                renderer: () => {},
                width: 'flex',
                align: 'left',
                formatter: null,
                dataType: 'string',
              },
              {
                column: 'company',
                alias: 'Company',
                visible: true,
                renderer: () => {},
                width: 100,
                align: 'left',
                formatter: null,
                dataType: 'string',
              },
            ];
        `;
  };

  return (
    <div>
      <CodeCell codeGenerator={generateTableHeaders} title="Table Headers" />
    </div>
  );
};

export default TableHeaderDemo;
