import { useState } from 'react';

export interface InputProps {
  onClick?: (e: string) => void;
}

const Input = ({ onClick }: InputProps) => {
  const [text, setText] = useState<string>('');

  const handleClick = () => {
    if (onClick) {
      onClick(text);
    }
  };

  return (
    <div className="flex w-[300px]">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="px-2 py-1 rounded-l-lg shadow-md active:border-purple-500 outline-none w-full"
      />
      <button onClick={handleClick} className="border px-2 rounded-r-lg">Search</button>
    </div>
  );
};

export default Input;
