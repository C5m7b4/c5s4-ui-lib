import { useClickOutside } from '../../../../src';

const MyComponent = () => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (!ref.current) return;
    ref.current.setAttribute('data-display', 'closed');

    setTimeout(() => {
      close();
    }, 500);
  });

  const open = () => {
    if (!ref.current) return;
    ref.current.setAttribute('data-display', 'open');
  };

  return (
    <div className="bg-orange-500">
      <button onClick={open}>Open</button>
      <div
        ref={ref}
        data-display="closed"
        className="relative group bg-red-500 transition-all duration-500 h-[100px] overflow-hidden
            data-[display=closed]:animate-collapse
            data-[display=open]:animate-expand"
      >
        <div
          ref={ref}
          className="absolute bg-bkg text-content shadow-md w-full h-full border rounded-b-lg"
        >
          <div className="p-4">Content</div>
          <p>Click outside to close</p>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
