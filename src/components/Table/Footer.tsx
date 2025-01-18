import { ITableHeader } from '../../types';
import { useEffect, useState } from 'react';
import { min, max, sum, avg, median } from './aggregaters';
import { converter } from '../../utils/sort';

interface FooterProps<T> {
  data: T[];
  selectedColumn: ITableHeader | null;
  footerBackgroundClass?: string;
  footerBackgroundColorStyle?: string;
  footerTextColorClass?: string;
  footerTextColorStyle?: string;
}

const Footer = <T,>({
  data,
  selectedColumn,
  footerBackgroundClass = 'bg-gray-400',
  footerBackgroundColorStyle,
  footerTextColorClass = 'text-white',
  footerTextColorStyle,
}: FooterProps<T>) => {
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [sumValue, setSumValue] = useState(0);
  const [avgValue, setAvgValue] = useState(0);
  const [medianValue, setMedianValue] = useState(0);

  useEffect(() => {
    if (!data) return;
    if (data.length === 0) return;
    if (selectedColumn == null) return;

    const numbers = data.map((record) =>
      converter(String(record[selectedColumn?.column as keyof T]), 'number'),
    );
    setMaxValue(max(numbers as number[]));
    setMinValue(min(numbers as number[]));
    setSumValue(sum(numbers as number[]));
    setAvgValue(avg(numbers as number[]));
    setMedianValue(median(numbers as number[]));
  }, [selectedColumn, data]);

  return (
    <tfoot query-id="tfoot">
      <tr>
        {selectedColumn != null ? (
          <td colSpan={9}>
            <div
              className={`flex gap-4 pl-2 ${footerBackgroundClass}
             ${footerTextColorClass} rounded-b-lg`}
              style={{
                backgroundColor: footerBackgroundColorStyle
                  ? footerBackgroundColorStyle
                  : '',
                color: footerTextColorStyle ? footerTextColorStyle : '',
              }}
            >
              <div>max: {maxValue.toFixed(2)}</div>
              <div>min: {minValue.toFixed(2)}</div>
              <div>sum: {sumValue.toFixed(2)}</div>
              <div query-id="avg">avg: {avgValue.toFixed(2)}</div>
              <div query-id="median">median: {medianValue.toFixed(2)}</div>
              <div>Total Records: {data.length}</div>
            </div>
          </td>
        ) : (
          <td
            colSpan={9}
            className={`flex gap-4 pl-2 ${footerBackgroundClass}
          ${footerTextColorClass} rounded-b-lg`}
            style={{
              backgroundColor: footerBackgroundColorStyle
                ? footerBackgroundColorStyle
                : '',
              color: footerTextColorStyle ? footerTextColorStyle : '',
            }}
          >
            <div>&nbsp;</div>
          </td>
        )}
      </tr>
    </tfoot>
  );
};

export default Footer;
