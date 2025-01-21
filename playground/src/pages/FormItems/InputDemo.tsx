/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Input } from '../../../../src';
import { iData, data } from '../../data/pivotData';

type filteredData = string | number | boolean | undefined;
type filterText =
  | 'index'
  | 'company'
  | 'guid'
  | 'cookieType'
  | 'isLoyalty'
  | 'revenue'
  | 'unitsSold'
  | 'orderDate';

const InputDemo = () => {
  const displayData: iData[] = data;
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<filteredData[]>([]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (!isSearching) {
      setFilteredData([]);
      setText('');
    } else if (text.length) {
      setFilteredData(
        displayData.map((record: iData) => record[text as filterText]),
      );
    }
    console.log(isSearching, text, filteredData);
  }, [isSearching]);

  return (
    <div className='mt-5'>
      <div className="mb-3">
        Try searching for index, guid, isLoyalty, revenue, and/or cookieType
      </div>
      <Input
        text={text}
        setText={setText}
        setIsSearching={setIsSearching}
      />
      <div>
        <button
          className="border mt-3 py-1 px-2 rounded-lg"
          onClick={() => setIsSearching(false)}
        >
          Clear Search
        </button>
      </div>
      <div className='max-h-56'>
        {isSearching && filteredData
          ? filteredData.map((record, idx) => <div key={`record-${idx}`}>{record}</div>)
          : null}
      </div>
    </div>
  );
};

export default InputDemo;
