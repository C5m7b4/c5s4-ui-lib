import { JsonTreeView, SplitContainer } from '../../../../src';
import { data } from './data';

const View1 = () => {
  return <div>View1</div>;
};

const View2 = () => {
  return <div>View 2</div>;
};

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
      <div className="w-full min-h-[350px]">
        <SplitContainer
          direction="horizontal"
          firstChild={<View1 />}
          secondChild={<View2 />}
          parentWidth={25}
        />
      </div>
    </div>
  );
};

export default JsonTreeViewDemo;
