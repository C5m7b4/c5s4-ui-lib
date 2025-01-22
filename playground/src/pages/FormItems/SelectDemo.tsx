import { data, iData } from '../../data';
import { Select } from '../../../../src';

const SelectDemo = () => {
  return (
    <div>
      <Select<iData>
        data={data}
        displayKey={'name'}
        label={'Select type'}
        labelPosition="top"
        onSelect={(e: iData) => {
          console.log(e);
        }}
      />
    </div>
  );
};

export default SelectDemo;
