import React, { useState, useRef, useEffect } from 'react';
import { ITableHeader } from '../../../types';

export interface StringEditorProps {
  defaultValue: string;
  onFinishEditing: (value: string, header: ITableHeader) => void;
  header: ITableHeader;
}

const StringEditor = ({
  defaultValue,
  onFinishEditing,
  header,
}: StringEditorProps) => {
  const [value, setValue] = useState(defaultValue);
  const ref = useRef<HTMLInputElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      //   onFinishEditing(value);
      ref.current.blur();
    }
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFinishEditing(value, header);
    }
  };

  return (
    <input
      ref={ref}
      onBlur={() => onFinishEditing(value, header)}
      onFocus={(e) => e.target.select()}
      onKeyDown={handleKeyDown}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ width: '100%', borderRadius: '10px' }}
    />
  );
};

export default StringEditor;
