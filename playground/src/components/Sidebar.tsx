import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import SidebarModal from './SideBarModal';

const Sidebar = () => {
  const [showSideBarModal, setShowSideBarModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [children, setChildren] = useState<string[] | null>(null);
  const [menuItem, setMenuItem] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [activeMenuItem, setActiveMenuItem] = useState<number>(0);

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
    setActiveMenuItem(index);
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

      <div
        className={`${style}, ${activeMenuItem === 0 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 1, 0)}
      >
        <div>Form Items</div>
      </div>

      <div
        className={`${style}, ${activeMenuItem === 9 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 10, 9)}
      >
        <NavLink to="editor">Code Editor Demos</NavLink>
      </div>

      <div
        className={`${style}, ${activeMenuItem === 10 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 11, 10)}
      >
        <NavLink to="debugger">Debugger Demos</NavLink>
      </div>

      <div
        className={`${style}, ${activeMenuItem === 8 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 9, 8)}
      >
        <NavLink to="diff">Diff Editor Demos</NavLink>
      </div>

      <div
        className={`${style}, ${activeMenuItem === 6 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 7, 6)}
      >
        <NavLink to="hooks">Hooks Demos</NavLink>
      </div>

      <div
        className={`${style}, ${activeMenuItem === 4 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 5, 4)}
      >
        <NavLink to="json">JsonTree</NavLink>
      </div>

      <div
        className={`${style}, ${activeMenuItem === 5 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 6, 5)}
      >
        <NavLink to="pivot">Pivot Table</NavLink>
      </div>

      <div
        className={`${style}, ${activeMenuItem === 1 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 2, 1)}
      >
        <NavLink to="split">Split Container</NavLink>
      </div>

      <div
        className={`${style}, ${activeMenuItem === 7 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 8, 7)}
      >
        <NavLink to="table">Table</NavLink>
      </div>

      <div
        className={`${style}, ${activeMenuItem === 2 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 3, 2)}
      >
        <NavLink to="toasts">Toasts</NavLink>
      </div>

      {/* <div
        className={`${style}, ${activeMenuItem === 3 ? 'bg-hover text-content' : ''}`}
        onClick={(e) => handleMenuClick(e, 4, 3)}
      >
        <NavLink to="tooltips">Tooltips</NavLink>
      </div> */}

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
