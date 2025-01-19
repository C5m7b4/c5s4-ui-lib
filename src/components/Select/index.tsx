import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from '../../icons';
import { getByQueryId } from '../../utils';

type labelPosition = 'top' | 'left';

export interface SelectProps<T> {
  data: T[];
  displayKey: keyof T;
  valueKey: keyof T;
  label: string;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (e: T) => void;
  labelPosition?: labelPosition;
  useLabel?: boolean;
  backgroundClass?: string;
  textColorClass?: string;
  fillClass?: string;
  hoverClass?: string;
}

const Select = <T,>({
  data,
  displayKey,
  valueKey,
  label,
  value,
  onSelect,
  labelPosition = 'top',
  useLabel = true,
  backgroundClass,
  textColorClass,
  fillClass = 'fill-content',
  hoverClass = 'bg-slate-400',
}: SelectProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [query, setQuery] = useState<string>('');

  const componentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    const triggerRef = getByQueryId('trigger-ref', componentRef.current!);
    if (!triggerRef) return;
    const listRef = getByQueryId('list', componentRef.current!);
    if (!listRef) return;

    if (!triggerRef.contains(e.target as Node)) {
      if (!listRef.contains(e.target as Node)) {
        listRef.setAttribute('data-display', 'closed');
      }
    }
  };

  useEffect(() => {
    if (value && value.length > 0) {
      const item = data.find((item) => String(item[valueKey]) === value);
      if (item) {
        setQuery(item[displayKey] as string);
      }
    }
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          String(item[displayKey]).toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [query, data, displayKey]);

  const handleTriggerClick = () => {
    const div = getByQueryId('list', componentRef.current!) as HTMLDivElement;
    if (!div) return;

    setQuery('');

    const currentStatus = div.getAttribute('data-display');
    div.setAttribute(
      'data-display',
      currentStatus === 'open' ? 'closed' : 'open',
    );
  };

  const handleSelect = (item: T) => {
    if (onSelect) {
      onSelect(item);
      if (listRef.current) {
        listRef.current.setAttribute('data-display', 'closed');
      }
    }
    setQuery(item[displayKey] as string);
  };

  return (
    <div ref={componentRef} className={`w-full`}>
      <div className={`flex ${labelPosition === 'top' ? 'flex-col' : ''} mt-2`}>
        {useLabel ? (
          <label
            query-id="label"
            className="flex place-items-center h-full w-full py-1 pr-2"
          >
            {label}
          </label>
        ) : null}

        <div className="relative">
          <div ref={triggerRef} query-id="trigger-ref">
            <input
              query-id="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={(e) => e.target.select()}
              type="text"
              className={`${backgroundClass} rounded-lg shadow-md px-2 py-1 w-full
                outline-none border ring-0 focus:ring-0 focus:border-purple-500`}
            />
            <div onClick={handleTriggerClick} query-id="trigger">
              <ChevronDown
                height={18}
                width={18}
                stroke={'transparent'}
                fill={fillClass}
                style={{ top: '5px' }}
                className={`absolute right-0 cursor-pointer pr-2 pt-2 ${textColorClass}`}
              />
            </div>
          </div>
          <div
            data-display="closed"
            query-id="list"
            ref={listRef}
            className={`absolute w-full rounded-b-xl shadow-lg 
            overflow-y-scroll max-h-[350px] z-20 no-scrollbar
            data-[display=closed]:animate-dissappear
            data-[display=open]:animate-appear ${backgroundClass}`}
          >
            {filteredData.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    handleSelect(item);
                  }}
                  query-id={`option-${index}`}
                  className={`cursor-pointer w-full  text-left
                 px-2 py-2 
                 hover:${hoverClass} transition-all duration-500
                 last:rounded-b-lg`}
                  key={`sel-item-${index}`}
                >
                  {String(item[displayKey])}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
