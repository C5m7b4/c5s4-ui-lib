import { createPortal } from 'react-dom';
import { useClickOutside } from '../../../src';
import { NavLink } from 'react-router';

type children = string[] | null;

interface SidebarModalProps {
  open: boolean;
  close: () => void;
  position: { x: number; y: number };
  children: children;
  menuItem: string;
  disabled: boolean;
}

const SidebarModal = ({
  open,
  close,
  position,
  children,
  menuItem,
  disabled
}: SidebarModalProps) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (!ref.current) return;
    ref.current.setAttribute('data-display', 'closed');

    setTimeout(() => {
      close();
    }, 500);
  });

  return open && !disabled
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-full z-10">
          <div
            ref={ref}
            data-display="open"
            className={`absolute flex flex-col bg-white p-4 rounded-r-lg z-20 shadow-md 
                data-[display=closed]:animate-slideSubmenuOutToLeft
                data-[display=open]:animate-slideSubmenuInFromLeft`}
            style={{ top: position.y, left: position.x }}
          >
            {children.map((item, i) => (
              <NavLink
                key={`submenu-${i}-${item.toLowerCase()}`}
                to={`${menuItem}/${item.toLowerCase()}`}
                className='hover:underline'
              >
                {item}
              </NavLink>
            ))}
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default SidebarModal;
