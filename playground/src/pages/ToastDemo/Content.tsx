import { useState } from 'react';
import {
  ToastPosition,
  ToastProviderProps,
  ToastType,
  useToast,
  CodeCell,
} from '../../../../src';
import { highLightCode } from '../../utils/highligher';
import ToastProviderSetup from './ToastProviderSetup';
import ToastSetup from './ToastSetup';

export type SetterType = {
  setAutoClose: (value: boolean) => void;
  setDuration: (value: number) => void;
  setPosition: (value: ToastPosition) => void;
  setRecentOnTop: (value: boolean) => void;
};

const Content = ({
  autoClose,
  setAutoClose,
  duration,
  setDuration,
  position,
  setPosition,
  recentOnTop,
  setRecentOnTop,
}: ToastProviderProps & SetterType) => {
  const toast = useToast();
  // const { showTooltip, hideTooltip } = useTooltip();
  const [message, setMessage] = useState('Here is a toast message');
  const [toastType, setToastType] = useState<ToastType>('error');
  const [useIcon, setUseIcon] = useState(true);
  const [toastAutoClose, setToastAutoClose] = useState(false);
  const [toastDuration, setToastDuration] = useState(5000);

  const handleError = () => {
    toast.error(message);
  };
  const handleSuccess = () => {
    toast.success(message);
  };
  const handleInfo = () => {
    toast.info(message);
  };
  const handleWarning = () => {
    toast.warn(message);
  };

  const generateToastProviderCode = () => {
    let code = `import {ToastProvider} from 'C5S4-ui-lib';\n`;
    code += '<ToastProvider';
    if (!autoClose) code += '\n\tautoClose={false}';
    if (duration != 5000) code += `\n\tduration={${duration}}`;
    if (position != 'top-right') code += `\n\tposition='${position}'`;
    if (recentOnTop) code += '\n\trecentOnTop={true}';
    code += '>\n';
    code += '\t<App />\n';
    code += '</ToastProvider>';
    const highlighted = highLightCode(code);
    return highlighted;
  };

  const generateToastCode = () => {
    let code = `import {useToast} from 'C5S4-ui-lib';\n`;
    code += `const App = () => {\n`;
    code += `\tconst toast = useToast();\n`;
    code += '\tconst handleClick = () => {\n';
    code += `\t\ttoast.${toastType}("This is an ${toastType} message"`;
    if (!useIcon || !toastAutoClose || toastDuration !== 5000) code += ', {\n';

    if (!useIcon) code += `\t\t\tuseIcon={false}\n`;
    if (!toastAutoClose) code += `\t\t\tautoClose={false}\n`;
    if (toastDuration !== 5000) code += `\t\t\tduration={${toastDuration}}\n`;

    if (useIcon && toastAutoClose && toastDuration === 5000) {
      code += ');\n';
    } else {
      code += '\t\t});\n';
    }
    code += '\t}\n';
    code += '\treturn (\n';
    code += '\t\t<div>\n';
    code += '\t\t\t<button onClick={handleClick}>Show Toast</button>\n';
    code += '\t\t</div>\n';
    code += '\t)\n';
    code += '};';
    code += '\n\nexport default App';
    const highlighted = highLightCode(code);
    return highlighted;
  };

  return (
    <div className="w-3/4 margin-auto h-full flex flex-col items-center">
      <div className="text-xl font-medium">Toast Demo</div>
      <div className="grid grid-cols-2 gap-8 border rounded-lg shadow-md w-full">
        <ToastProviderSetup
          autoClose={autoClose}
          setAutoClose={setAutoClose}
          duration={duration}
          setDuration={setDuration}
          position={position}
          setPosition={setPosition}
          recentOnTop={recentOnTop}
          setRecentOnTop={setRecentOnTop}
        />
        <ToastSetup
          toastType={toastType}
          setToastType={setToastType}
          useIcon={useIcon}
          setUseIcon={setUseIcon}
          toastAutoClose={toastAutoClose}
          setToastAutoClose={setToastAutoClose}
          toastDuration={toastDuration}
          setToastDuration={setToastDuration}
        />
      </div>
      <div className="mt-2 mb-2 w-full">
        <div className="flex w-full justify-between place-items-center items-center">
          <label className=" text-right mr-4 mt-2">Enter Message</label>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" bg-bkg text-content rounded-lg shadow-md px-2 py-1 flex-1
                  outline-none border ring-0 focus:ring-0 focus:border-purple-500"
          />
        </div>
      </div>
      <div
        className="flex w-full justify-center gap-4"
        style={{ marginTop: '10px' }}
      >
        <button
          // onMouseEnter={(e) =>
          //   showTooltip('This is a error toast', e.clientX, e.clientY)
          // }
          // onMouseLeave={hideTooltip}
          className="toast-error px-4 py-2 rounded-lg"
          onClick={handleError}
        >
          Error
        </button>
        <button
          className="toast-success px-4 py-2 rounded-lg"
          onClick={handleSuccess}
        >
          Success
        </button>
        <button
          className="toast-info px-4 py-2 rounded-lg"
          onClick={handleInfo}
        >
          Info
        </button>
        <button
          className="toast-warning px-4 py-2 rounded-lg"
          onClick={handleWarning}
        >
          Warning
        </button>
      </div>

      <div className="flex flex-col gap-8 mt-6 w-full justify-between">
        {/* toast container */}
        <CodeCell
          codeGenerator={generateToastProviderCode}
          title="Toast Container"
          expandedState="collapsed"
        />

        {/* toasts */}
        <CodeCell codeGenerator={generateToastCode} title="Toasts" />
      </div>
    </div>
  );
};

export default Content;
