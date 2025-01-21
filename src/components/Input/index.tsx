export interface InputProps {
  text: string;
  setText: (str: string) => void;
  setIsSearching: (bool: boolean) => void;
  setIsClicked: (bool: boolean) => void;
  width?: number;
}

const Input = ({ text, setText, setIsSearching, width = 300, setIsClicked }: InputProps) => {

  // subject to change
  const handleClick = () => {
    setIsSearching(true);
    setIsClicked(true);
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`text-black w-[${width}px] px-2 py-1 rounded-l-lg shadow-md active:border-purple-500 outline-none`}
        />
        <button onClick={handleClick} className="border px-2 rounded-r-lg">
          Search
        </button>
      </div>
    </div>
  );
};

export default Input;
