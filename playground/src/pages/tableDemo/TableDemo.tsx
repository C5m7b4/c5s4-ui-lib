import { tableData, tableHeaders } from '../../data/tableData';
import { Table, CodeCell } from '../../../../src';
import { highLightCode, tableSyntaxRules } from '../../utils/highligher';

const TableDemo = () => {
  const generateTableCode = () => {
    const code = `      <Table
        data={tableData}
        headers={tableHeaders}
        backgroundColorClass='bg-bkg'
        textColorClass='text-content'
        footerBackgroundClass='bg-bkg2'
        footerTextColorClass='text-content'
        stripeEvenClass='even:bg-stripeEven'
        stripeOddClass='odd:bg-stripeOdd'
        hoverClass='hover:bg-hover'
        textColorClass2='text-content2'
        tablePluginType='cellEditingPlugin'
      />`;

    const highlighted = highLightCode(code, tableSyntaxRules);
    return highlighted;
  };
  return (
    <div className="p-4">
      <div>Table Demos</div>
      <Table
        data={tableData}
        headers={tableHeaders}
        backgroundColorClass="bg-bkg2"
        textColorClass="text-content"
        footerBackgroundClass="bg-bkg2"
        footerTextColorClass="text-content"
        stripeEvenClass="even:bg-stripeEven"
        stripeOddClass="odd:bg-stripeOdd"
        hoverClass="hover:bg-hover"
        textColorClass2="text-content2"
        tablePluginType="cellEditingPlugin"
      />
      <div className="mt-4">
        <CodeCell
          codeGenerator={generateTableCode}
          title="Cell Editing Plugin"
          expandedState="expanded"
        />
      </div>
    </div>
  );
};

export default TableDemo;
