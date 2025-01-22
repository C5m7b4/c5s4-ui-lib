import { useRef, useState } from 'react';
import { NavLink } from 'react-router';

const Sidebar = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const style =
    'w-full border-b py-2 pl-2 text-left font-medium cursor-pointer hover:bg-hover hover:text-bkg transition-all duration-500';

  const parentRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => setIsSubmenuOpen(true);
  const handleMouseLeave = () => setIsSubmenuOpen(false);

  return (
    <div
      className="min-w-[200px] border-r min-h-screen"
      style={{ height: '100%' }}
    >
      <div className="text-xl font-medium text-left border-b mb-2 px-2 py-2">
        Sidebar
      </div>

      <div
        ref={parentRef}
        className={`${style} flex justify-between`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>Form Items</div>
        <div
          className={`pr-2 pt-0 text-left transition-all duration-500 ${
            isSubmenuOpen
              ? 'max-h-40 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="flex flex-col">
            <NavLink to="forms/select" className="hover:underline">
              Select
            </NavLink>
            <NavLink to="forms/input" className="hover:underline">
              Input
            </NavLink>
            <NavLink to="forms/checkbox" className="hover:underline">
              Checkbox
            </NavLink>
            <NavLink to="forms/radio" className="hover:underline">
              Radio
            </NavLink>
          </div>
        </div>
      </div>

      <div className={style}>
        <NavLink to="table">Table</NavLink>
      </div>

      <div className={style}>
        <NavLink to="toasts">Toasts</NavLink>
      </div>

      <div className={style}>
        <NavLink to="tooltips">Tooltips</NavLink>
      </div>

      <div className={style}>
        <NavLink to="json">JsonTree</NavLink>
      </div>

      <div className={style}>
        <NavLink to="pivot">Pivot Table</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
