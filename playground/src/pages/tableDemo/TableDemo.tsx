import { tableData, tableHeaders } from '../../data/tableData';
import { Table, CodeCell, DiffEditor } from '../../../../src';
import { highLightCode, tableSyntaxRules } from '../../utils/highligher';

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
        <DiffEditor />
      </div>
      <div className="mt-4">
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
          tablePluginType="rowEditingPlugin"
        />
      </div>
      <div className="mt-4">
        <CodeCell
          codeGenerator={() => generateTableCode(true)}
          title="Row Editing Plugin"
          expandedState="expanded"
        />
      </div>
    </div>
  );
};

export default TableDemo;
