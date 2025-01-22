/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
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
  const [isSearching, setIsSearching] = useState<boolean | null>(false);
  const [filteredData, setFilteredData] = useState<filteredData[]>([]);
  const [text, setText] = useState<string>('');
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearching) {
      if (displayRef.current) {
        displayRef.current.setAttribute('data-display', 'active-search');
      }
      setFilteredData(
        displayData.map((record: iData) => record[text as filterText]),
      );
    } else {
      if (displayRef.current) {
        displayRef.current.setAttribute('data-display', 'inactive-search');
      }
      setFilteredData([]);
      setText('');
    }
    setIsClicked(false)
  }, [isSearching, setIsSearching, setText, isClicked]);

  return (
    <div className="mt-5">
      <div className="mb-3">
        Try searching for index, guid, isLoyalty, revenue, and/or cookieType
      </div>
      <Input text={text} setText={setText} setIsSearching={setIsSearching} setIsClicked={setIsClicked} />
      <div>
        <button
          className="border mt-5 py-1 px-2 rounded-lg"
          onClick={() => setIsSearching(false)}
        >
          Clear Search
        </button>
      </div>
      <div
        ref={displayRef}
        data-display="inactive-search"
        className="data-[display=active-search]:border max-h-80 overflow-auto no-scrollbar mt-5"
      >
        {isSearching && filteredData
          ? filteredData.map((record, idx) => (
              <div
                key={`record-${idx}`}
                className="mb-1 w-full flex justify-center"
              >
                <div className="mr-2 w-8 text-right">{idx}:</div>
                <div className="max-w-[310px] text-left">{record}</div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default InputDemo;
