import { createPortal } from 'react-dom';
import { GearIcon } from '../../../src';
import { useRef, useEffect, useState } from 'react';
import { Select } from '../../../src';

const modeData = [
  {
    name: 'Light Mode',
    value: 'light',
  },
  {
    name: 'Dark Mode',
    value: 'dark',
  },
  {
    name: 'Cool Mode',
    value: 'cool',
  },
  {
    name: 'Purple Mode',
    value: 'purple',
  },
];

interface FloatingControlsProps {
  defaultTheme: string;
}

const FloatingControls = ({ defaultTheme }: FloatingControlsProps) => {
  const [value, setValue] = useState<string>(defaultTheme)
  const ref = useRef<HTMLDivElement>(null);

  if (localStorage.getItem('theme') !== value) {
    setValue(localStorage.getItem('theme') as string);
  }
  
  useEffect(() => {}, [defaultTheme]);

  const handleChange = (e: { name: string; value: string }) => {
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', e.value);
    localStorage.setItem('theme', e.value);
    if (!ref.current) return;
    ref.current.setAttribute('data-display', 'closed');
  };

  const handleGearClick = () => {
    if (!ref.current) return;

    const currentState = ref.current.getAttribute('data-display');
    ref.current.setAttribute(
      'data-display',
      currentState === 'closed' ? 'open' : 'closed',
    );
  };

  return createPortal(
    <div
      ref={ref}
      data-display="closed"
      className="group fixed bg-bkg text-content right-0 top-20 flex gap-2 cursor-pointer  z-20
      data-[display=closed]:animate-slideOutToRightModal
      data-[display=open]:animate-slideInFromRightModal
      rounded-l-lg shadow-md py-2 pl-2 pr-4"
    >
      <div className="mt-2 mr-4">
        <GearIcon
          height={24}
          width={24}
          fill="fill-bkg"
          stroke="fill-bkg"
          onClick={handleGearClick}
          className="fill-content"
        />
      </div>
      <div>
        <Select
          data={modeData}
          displayKey="name"
          valueKey="value"
          onSelect={handleChange}
          label=""
          useLabel={false}
          backgroundClass="bg-bkg"
          fillClass="fill-content"
          value={value}
        />
      </div>
    </div>,
    document.body,
  );
};

export default FloatingControls;
