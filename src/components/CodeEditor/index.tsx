import React, { useState, useRef, useEffect } from 'react';

export interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  currentLine: number | null;
  delay?: number;
  caretClass?: string;
  caretStyleColor?: string;
  backgroundClass?: string;
  textColorClass?: string;
  backgroundStyleColor?: string;
  textStyleColor?: string;
}

const CodeEditor = ({
  code,
  setCode,
  currentLine,
  delay = 300,
  caretClass,
  caretStyleColor,
  backgroundClass,
  textColorClass,
  backgroundStyleColor,
  textStyleColor,
}: CodeEditorProps) => {
  const [lineNumber, setLineNumber] = useState(0);
  const [column, setColumn] = useState(0);
  const [autoTab, setAutoTab] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const delayRef = useRef<number>(delay);

  useEffect(() => {
    if (!textAreaRef.current) return;

    if (code.endsWith('{')) {
      const newCode = code + '\n  \n}';
      setAutoTab(true);
      setCode(newCode);
      setTimeout(() => {
        const position = newCode.length - 2;
        textAreaRef.current?.setSelectionRange(position, position);
      }, delayRef.current);
    }
  }, [code]);

  useEffect(() => {
    if (currentLine !== null && currentLine >= 1) {
      highlightLine();
    }
  }, [currentLine]);

  const highlightLine = () => {
    if (currentLine === null) return;
    if (!textAreaRef.current) return;
    const lines = code.split('\n');
    let startIndex = 0;

    for (let i = 0; i < currentLine - 1; i++) {
      startIndex += lines[i].length + 1;
    }
    if (typeof lines[currentLine - 1] === 'undefined') {
      return;
    }
    const endIndex = startIndex + lines[currentLine - 1].length;
    console.log('startIndex', startIndex, 'endIndex', endIndex);

    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(startIndex, endIndex);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const getHighlightedCode = (code: string) => {
    return highLightCode(code);
  };

  const highLightCode = (code: string): string => {
    // Basic syntax highlighting rules
    const keywords = /\b(const|let|var|function|if|else|return|log)\b/g;
    const numbers = /\b\d+\b/g;
    const operators = /(?<![a-zA-Z0-9])([=+\-*<>!]+)(?![a-zA-Z0-9])/g;
    //const variableNames = /\b(?:var|let|const)\s+(\w+)/g;

    //const result = code.match(variableNames);

    const output = code
      // .replace(
      //   variableNames,
      //   '<span class="variables" style="color: #e9e7g4">$1</span>'
      // )
      .replace(
        keywords,
        `<span class="keyword" style="color: #569cd6">$&</span>`,
      )
      .replace(numbers, `<span class="number" style="color: #db46c2">$&</span>`)
      .replace(
        operators,
        `<span class="operator" style="color: #e9ae57">$&</span>`,
      );

    return output;
  };

  const handleClick = () => {
    if (!textAreaRef.current) return;

    const caretPosition = textAreaRef.current.selectionStart;
    const textBeforeCaret = textAreaRef.current.value.substring(
      0,
      caretPosition,
    );
    const line = textBeforeCaret.split('\n').length;
    setLineNumber(line);
    const column = caretPosition - textBeforeCaret.lastIndexOf('\n') - 1;
    setColumn(column);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!textAreaRef.current) return;

    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);

    if (e.key === 'Tab') {
      e.preventDefault();
      const newCode = before + '  ' + after;
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = start + 2;
        handleClick();
      }, delayRef.current);
    } else if (e.key === 'Enter') {
      if (autoTab) {
        e.preventDefault();
        const newCode = before + '\n  ' + after;
        setCode(newCode);
        setTimeout(() => {
          textarea.selectionStart = start + 3;
          textarea.selectionEnd = start + 3;
          handleClick();
        }, delayRef.current);
      }
    }
  };

  const handleTestClick = () => {
    if (!textAreaRef.current) return;
    const textarea = textAreaRef.current;
    const input1 = getByQueryId('input1') as HTMLInputElement;
    const input2 = getByQueryId('input2') as HTMLInputElement;
    textarea.focus();
    textarea.selectionStart = Number(input1.value);
    textarea.selectionEnd = Number(input2.value);
  };

  const getByQueryId = (queryId: string) => {
    const result = document.querySelector(`[query-id="${queryId}"]`);
    if (result) {
      return result;
    } else {
      return null;
    }
  };

  return (
    <div className="min-h-[400px] w-full font-mono">
      <input type="number" className="border-2 text-black" query-id="input1" />
      <input type="number" className="border-2 text-black" query-id="input2" />
      <button
        className="rounded-lg shadow-md bg-slate-400 px-4 py-1"
        onClick={handleTestClick}
      >
        Click me
      </button>
      <div className="flex">
        <div
          className={`${backgroundClass} ${textColorClass} border rounded-l-lg`}
        >
          {code.split('\n').map((_, i) => (
            <div key={`ln-${i}`} className="linenumber px-2">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="code-container relative w-full min-h-[400px]">
          {/* Highlighted Code Display */}
          <div
            style={{
              backgroundColor: backgroundStyleColor,
              color: textStyleColor,
            }}
            className={`highlight-layer 
                absolute top-0 left-0 
                w-full min-h-[400px] 
              ${backgroundClass} ${textColorClass}
                whitespace-pre-wrap overflow-hidden pointer-events-none
                pl-2 text-left`}
            dangerouslySetInnerHTML={{ __html: getHighlightedCode(code) }}
          />

          {/* Textarea for Input */}
          <textarea
            ref={textAreaRef}
            className={`code-input border  
                absolute top-0 left-0 
                w-full h-full 
                bg-transparent text-transparent
                ${caretClass} whitespace-pre-wrap overflow-auto font-mono pl-2`}
            style={{
              caretColor: caretStyleColor,
            }}
            value={code}
            onChange={handleInputChange}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onKeyUp={handleClick}
            spellCheck={false}
          />
        </div>
      </div>
      <div className="footer  flex px-8">
        <div className="mr-6 border-r px-2">Line #: {lineNumber}</div>
        <div className="border-r px-2">Column #: {column}</div>
        <div className="border-r px-2">Code Length: {code.length}</div>
      </div>
    </div>
  );
};

export default CodeEditor;
