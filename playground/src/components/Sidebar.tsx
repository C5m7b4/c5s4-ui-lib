import { NavLink } from 'react-router';

const Sidebar = () => {
  const style =
    'w-full border-b py-2 pl-2 text-left font-medium cursor-pointer hover:bg-hover hover:text-bkg transition-all duration-500';

  const handleMouseEnter = () => {
    const submenu: HTMLDivElement | null = document.querySelector(
      '[data-display="submenu"]',
    );

    if (!submenu) return;

    submenu.classList.remove('animate-collapseSubmenu');
    submenu.classList.remove('hidden');
    submenu.classList.add('animate-expandSubmenu');
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      const submenu: HTMLDivElement | null = document.querySelector(
        '[data-display="submenu"]',
      );

      if (!submenu) return;

      submenu.classList.remove('animate-expandSubmenu');
      submenu.classList.add('animate-collapseSubmenu');
      submenu.classList.add('hidden');
    }, 150);
  };

  return (
    <div
      className="min-w-[200px] border-r min-h-screen"
      style={{ height: '100%' }}
    >
      <div className="text-xl font-medium text-left border-b mb-2 px-2 py-2">
        Sidebar
      </div>

      <div
        className={`${style} flex justify-between`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>Form Items</div>
        <div
          data-display="submenu"
          className="pr-2 pt-0 text-left max-h-0 opacity-0 hidden"
        >
          <div className="flex flex-col">
            <NavLink to="forms/select" className="hover:underline">
              Select
            </NavLink>
            <NavLink to="forms/input" className="hover:underline">
              Input
            </NavLink>
            <NavLink to="forms/checkbox" className="hover:underline">Checkbox</NavLink>
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
