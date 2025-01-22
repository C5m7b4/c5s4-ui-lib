import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import SidebarModal from './SideBarModal';

const Sidebar = () => {
  const [showSideBarModal, setShowSideBarModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [children, setChildren] = useState<string[] | null>(null);
  const [menuItem, setMenuItem] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (children) setShowSideBarModal(true);
  }, [children]);

  const style =
    'w-full border-b py-2 pl-2 text-left font-medium cursor-pointer hover:bg-hover hover:text-bkg transition-all duration-500';

  const handleMenuClick = (
    e: React.MouseEvent<HTMLDivElement>,
    factor: number,
    index: number = 0,
  ) => {
    const left = e.currentTarget.clientWidth;
    const top = 65 + index + e.currentTarget.clientHeight * factor;

    setPosition({
      x: left,
      y: top,
    });

    switch (index) {
      case 0:
        setMenuItem('forms');
        setDisabled(false);
        setChildren(['Select', 'Input', 'Checkbox', 'Radio']);
        break;
      default:
        setDisabled(true);
        setMenuItem('');
        setChildren(null);
    }
  };

  return (
    <div
      className="min-w-[200px] border-r min-h-screen"
      style={{ height: '100%' }}
    >
      <div className="text-xl font-medium text-left border-b px-2 py-2">
        Sidebar
      </div>

      <div className={`${style}`} onClick={(e) => handleMenuClick(e, 1)}>
        <div>Form Items</div>
      </div>

      <div className={style} onClick={(e) => handleMenuClick(e, 2, 1)}>
        <NavLink to="table">Table</NavLink>
      </div>

      <div className={style} onClick={(e) => handleMenuClick(e, 3, 2)}>
        <NavLink to="toasts">Toasts</NavLink>
      </div>

      <div className={style} onClick={(e) => handleMenuClick(e, 4, 3)}>
        <NavLink to="tooltips">Tooltips</NavLink>
      </div>

      <div className={style} onClick={(e) => handleMenuClick(e, 5, 4)}>
        <NavLink to="json">JsonTree</NavLink>
      </div>

      <div className={style} onClick={(e) => handleMenuClick(e, 6, 5)}>
        <NavLink to="pivot">Pivot Table</NavLink>
      </div>
      <SidebarModal
        open={showSideBarModal}
        close={() => setShowSideBarModal(false)}
        position={position}
        children={children}
        menuItem={menuItem}
        disabled={disabled}
      />
    </div>
  );
};

export default Sidebar;
