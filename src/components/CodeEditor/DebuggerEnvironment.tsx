import { useState, useEffect } from 'react';
import CodeEditor from './index';
import DebuggerControls from './DebuggerControls';
import VariableInspector from './VariableInspector';
import { instrumentCode } from './instrumentCode';

const DebuggerEnvironment = () => {
  const [code, setCode] = useState(`let x = 4; 
const y = 10;
const z = x + y;
console.log('z', z);`);
  const [variables, setVariables] = useState<Record<string, any>>({});
  const [currentLine, setCurrentLine] = useState<number | null>(null);
  const [format, setFormat] = useState(false);

  const updateLine = (line: number) => {
    if (!line) {
      setCurrentLine(null);
      return;
    }
    setCurrentLine((prev) => prev! + 1);
  };

  useEffect(() => {
    (window as any).updateVariablesCallback = setVariables;
    (window as any).updateLine = updateLine;

    return () => {
      (window as any).updateVariablesCallback = () => {};
      (window as any).updateLine = () => {};
    };
  }, []);

  const runCode = () => {
    updateLine(1);
    const instrumentedCode = instrumentCode(code);
    //console.log(instrumentedCode);
    const runtime = `
          let __variables = {};
          let __hooks = [];
          let __step = 0;
    
          window.__hook = function(line, variableName, value) {
            const fn = function(line, variableName, value){
              __variables["linenumber"] = line;
              console.log("Paused at line:", line);
              __variables["pauses at line"] = line;
              if ( variableName){
                 __variables[variableName] = value
              }
                 
              console.log("Variables:", __variables);
              window.updateVariablesCallback(__variables);
              console.log("setting line", line);
              window.updateLine(line);
            }
              const callbackObj = {
                fn,
                line,
                variableName,
                value
              }
            __addHook(callbackObj);
          }
    
          window.__addHook = function(callback) {
            __hooks.push(callback);
          }
    
          window.__pauseExecution = function() {
            debugger; // Pause execution
          }
    
          window.__next = function() {
            if (__step < __hooks.length) {
              const hookObj = __hooks[__step++];
              hookObj.fn(hookObj.line, hookObj.variableName, hookObj.value);
            } else {
               __variables["execution"] = "complete";
              window.updateVariablesCallback(__variables);
              window.updateLine(null);
              console.log("Execution complete");
            }
          }
    
          ${instrumentedCode}
    
    
      `;
    try {
      const fn = new Function(runtime);
      fn();
      //eval(runtime);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error executing code:', err);
    }
  };

  const stepCode = () => {
    try {
      // @ts-expect-error variable does not exist
      if (typeof window.__next === 'function') {
        // @ts-expect-error variable does not exist
        window.__next();
      }
      //setVariables((window as any).__variables); // Update variables
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error stepping through code:', err);
    }
  };

  const resetDebugger = () => {
    // setVariables({});
    // setCurrentLine(null);
  };

  return (
    <div>
      <h1>Debugger</h1>
      <DebuggerControls
        onRun={runCode}
        onStep={stepCode}
        onReset={resetDebugger}
        format={format}
        setFormat={setFormat}
      />
      <div style={{ display: 'flex', gap: '6px' }}>
        <CodeEditor
          //value={code}
          //onChange={setCode}
          currentLine={currentLine}
          code={code}
          setCode={setCode}
          //format={format}
          //setFormat={setFormat}
        />
        <VariableInspector variables={variables} />
      </div>
    </div>
  );
};

export default DebuggerEnvironment;
