import React from 'react';

interface VariableInspectorProps {
  variables: Record<string, any>;
}

const VariableInspector: React.FC<VariableInspectorProps> = ({ variables }) => {
  return (
    <div
      style={{ width: '300px' }}
      className="border-2 shadow-md border-slate-700 rounded-r-lg"
    >
      <div className="font-medium text-xl pl-2 py-1 border-b-4 border-slate-700">
        Variables
      </div>
      <ul>
        {Object.entries(variables).map(([key, value]) => (
          <li key={key}>
            <div className="grid grid-cols-[1fr_150px] w-full border-b border-slate-700">
              <div className="border-r-2 border-slate-700 p-2">{key}</div>
              <div className="text-right pr-2">{JSON.stringify(value)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariableInspector;
