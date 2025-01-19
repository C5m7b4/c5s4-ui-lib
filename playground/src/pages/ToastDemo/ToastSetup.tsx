import { Select } from '../../../../src';
import { ToastType } from '../../../../src';
import { toastTypeData } from './data';

interface ToastSetupProps {
  toastType: ToastType;
  setToastType: (value: ToastType) => void;
  useIcon: boolean;
  setUseIcon: (value: boolean) => void;
  toastAutoClose: boolean;
  setToastAutoClose: (value: boolean) => void;
  toastDuration: number;
  setToastDuration: (value: number) => void;
}

const ToastSetup = ({
  toastType,
  setToastType,
  useIcon,
  setUseIcon,
  toastAutoClose,
  setToastAutoClose,
  toastDuration,
  setToastDuration,
}: ToastSetupProps) => {
  const handleTypeChange = (e: { name: string; value: string }) => {
    setToastType(e.value as ToastType);
  };

  return (
    <div className="pr-2">
      <div className="border-b flex flex-col">Toasts</div>

      <div className="grid grid-cols-2 gap-4 mt-2 mb-4 pr-4">
        <div className="text-right mt-4">Type</div>
        <div className="text-left">
          <Select
            data={toastTypeData}
            displayKey="name"
            valueKey="value"
            onSelect={handleTypeChange}
            label=""
            useLabel={false}
            backgroundClass="bg-bkg"
            fillClass="fill-content"
            value={toastType}
          />
        </div>
      </div>
      <div className="rounded-t-lg p-2 border mb-2">
        <div className="p-2 mb-2">Options</div>

        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="text-right">useIcon?</div>
          <div className="text-left">
            <input
              type="checkbox"
              className="accent-purple-500 scale-125"
              checked={useIcon}
              onChange={(e) => setUseIcon(e.target.checked)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-right">Auto Close</div>
          <div className="text-left">
            <input
              type="checkbox"
              className="accent-purple-500 scale-125"
              checked={toastAutoClose}
              onChange={(e) => setToastAutoClose(e.target.checked)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-2 mt-2">
          <div className="text-right mt-2">Duration</div>
          <div className="text-left">
            <input
              value={toastDuration}
              onChange={(e) => setToastDuration(Number(e.target.value))}
              type="number"
              min="500"
              max="10000"
              step="500"
              className=" bg-bkg text-content rounded-lg shadow-md px-2 py-1 w-full
                  outline-none border ring-0 focus:ring-0 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-right mt-2">Animation Type</div>
          <div className="text-left">
            <input
              readOnly
              value="Slide In"
              className=" bg-bkg text-content rounded-lg shadow-md px-2 py-1 w-full
                  outline-none border ring-0 focus:ring-0 focus:border-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastSetup;
