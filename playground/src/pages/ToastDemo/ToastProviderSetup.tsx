import { Select, ToastPosition, ToastProviderProps } from '../../../../src';
import { SetterType } from './Content';
import { positionData } from './data';

const ToastProviderSetup = ({
  autoClose,
  setAutoClose,
  duration,
  setDuration,
  position,
  setPosition,
  recentOnTop,
  setRecentOnTop,
}: ToastProviderProps & SetterType) => {
  const handlePositionChange = (e: { name: string; value: string }) => {
    setPosition(e.value as ToastPosition);
  };

  return (
    <div>
      <div className="border-b flex flex-col">Toast Container</div>
      <div className="grid grid-cols-2 gap-6 mb-4 mt-4">
        <div className="text-right">AutoClose</div>
        <div className="text-left">
          <input
            type="checkbox"
            className="accent-purple-500 scale-125"
            checked={autoClose}
            onChange={(e) => setAutoClose(e.target.checked)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-4">
        <div className="text-right mt-4">Duration</div>
        <div className="text-left">
          <input
            value={duration}
            onChange={(e) => setDuration(+e.target.value)}
            type="number"
            min="500"
            max="10000"
            step="500"
            className=" bg-bkg text-content rounded-lg shadow-md px-2 py-1 w-full
                  outline-none border ring-0 focus:ring-0 focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="text-right mt-4">Position</div>
        <div className="text-left">
          <Select
            data={positionData}
            displayKey="name"
            valueKey="value"
            onSelect={handlePositionChange}
            label=""
            useLabel={false}
            backgroundClass="bg-bkg"
            fillClass="fill-content"
            value={position}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <div className="text-right">Recent on Top?</div>
        <div className="text-left">
          <input
            type="checkbox"
            className="accent-purple-500 scale-125"
            checked={recentOnTop}
            onChange={(e) => setRecentOnTop(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default ToastProviderSetup;
