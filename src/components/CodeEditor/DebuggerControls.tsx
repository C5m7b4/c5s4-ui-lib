import React from 'react';
import { DebuggerIcon } from './Icons';
import Tooltip from '../tooltips/Tooltip';

interface DebuggerControlsProps {
  onStep: () => void;
  onRun: () => void;
  onReset: () => void;
  format: boolean;
  setFormat: (format: boolean) => void;
}

const DebuggerControls: React.FC<DebuggerControlsProps> = ({
  onStep,
  onRun,
  onReset,
  format,
  setFormat,
}) => (
  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
    <Tooltip content="Debug Code" placement="bottom">
      <button
        onClick={onRun}
        className="border rounded-lg shadow-md p-2 cursor-pointer"
      >
        <DebuggerIcon height={24} width={24} stroke="white" strokeWidth={20} />
      </button>
    </Tooltip>

    <Tooltip content="Step through code" placement="bottom">
      <button onClick={onStep}>Step</button>
    </Tooltip>
    <Tooltip content="Rest Debugger" placement="bottom">
      <button onClick={onReset}>Reset</button>
    </Tooltip>
    <Tooltip content="Format Code" placement="bottom">
      <button onClick={() => setFormat(!format)}>Format</button>
    </Tooltip>
  </div>
);

export default DebuggerControls;
