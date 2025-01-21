export interface InputProps {
  text: string;
  setText: (t: string) => void;
  setIsSearching: (t: boolean) => void;
}

const Input = ({ text, setText, setIsSearching }: InputProps) => {

  const handleClick = () => {
    if (setIsSearching) {
      
      setIsSearching(true);
    } else {
      throw new Error('An onClick function must be passed as a prop');
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-black w-[300px] px-2 py-1 rounded-l-lg shadow-md active:border-purple-500 outline-none"
        />
        <button onClick={handleClick} className="border px-2 rounded-r-lg">
          Search
        </button>
      </div>
    </div>
  );
};

export default Input;
