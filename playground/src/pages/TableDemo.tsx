import { tableData, tableHeaders } from '../data/tableData';
import { Table } from '../../../src';

const TableDemo = () => {
  return (
    <div className="p-4">
      <div>Table Demo</div>
      <Table data={tableData} headers={tableHeaders} />
    </div>
  );
};

export default TableDemo;
