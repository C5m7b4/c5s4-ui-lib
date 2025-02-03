import { tableData, tableHeaders } from '../../data/tableData';
import { Table, CodeCell } from '../../../../src';
import { highLightCode, tableSyntaxRules } from '../../utils/highligher';
import TableHeaderDemo from './TableHeaderDemo';

const TableDemo = () => {
  const generateTableCode = (useRowEditor = false) => {
    let code = `      <Table
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
        `;
    code += useRowEditor
      ? `tablePluginType='rowEditingPlugin'`
      : `tablePluginType='cellEditingPlugin'`;
    code += `/>`;

    const highlighted = highLightCode(code, tableSyntaxRules);
    return highlighted;
  };
  return (
    <div className="p-4  w-full">
      <div>Table Demos</div>
      <div className="grid grid-cols-2 gap-3">
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

      <div>
        <TableHeaderDemo />
      </div>
    </div>
  );
};

export default TableDemo;
