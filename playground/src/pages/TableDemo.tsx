import { tableData, tableHeaders } from '../data/tableData';
import { Table } from '../../../src';

const TableDemo = () => {
  return (
    <div className="p-4">
      <div>Table Demo</div>
      <Table
        data={tableData}
        headers={tableHeaders}
        backgroundColorClass="bg-bkg2"
        textColorClass='text-content'
        footerBackgroundClass='bg-bkg2'
        footerTextColorClass='text-content'
        stripeEvenClass='even:bg-stripeEven'
        stripeOddClass='odd:bg-stripeOdd'
        hoverClass='hover:bg-hover'
        textColorClass2='text-content2'
      />
    </div>
  );
};

export default TableDemo;
