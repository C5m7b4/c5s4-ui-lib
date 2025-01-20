import { PivotTable } from '../../../../src';
import { data, iData } from '../../data/pivotData';
import { headers } from '../../data/headers';
import { useState } from 'react';

const PivotTableDemo = () => {
  const [usePivot, setUsePivot] = useState<boolean>(false);
  return (
    <div className="w-full margin-auto h-full flex flex-col items-center">
      <div className="text-xl font-medium">Toast Demo</div>
      <div className="w-full">
        <PivotTable<iData>
          data={data}
          headers={headers}
          usePivot={usePivot}
          setUsePivot={setUsePivot}
        />
      </div>
    </div>
  );
};

export default PivotTableDemo;
