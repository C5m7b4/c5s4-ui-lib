import { JsonTreeView } from '../../../../src';
import { data } from './data';

const JsonTreeViewDemo = () => {
  return (
    <div className=" w-full h-full">
      <div>Json TreeView Demo</div>
      <JsonTreeView
        data={data}
        backgroundColorClass="bg-bkg"
        textColorClass="text-content"
        className="cursor-pointer"
      />
    </div>
  );
};

export default JsonTreeViewDemo;
