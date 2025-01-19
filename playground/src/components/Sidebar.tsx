import { NavLink } from 'react-router';

const Sidebar = () => {
  const style =
    'w-full border-b py-2 pl-2 text-left font-medium cursor-pointer hover:bg-hover hover:text-bkg transition-all duration-500';
  return (
    <div
      className="min-w-[200px] border-r min-h-screen"
      style={{ height: '100%' }}
    >
      <div className="text-xl font-medium text-left border-b mb-2 px-2 py-2">
        Sidebar
      </div>

      <div className={style}>
        <NavLink to="forms">Form Items</NavLink>
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
    </div>
  );
};

export default Sidebar;
