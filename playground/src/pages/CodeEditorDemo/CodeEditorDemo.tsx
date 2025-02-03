import { CodeEditor } from '../../../../src';

const CodeEditorDemo = () => {
  return (
    <div className="w-full p-4">
      <div>Code Editor Demo</div>
      <CodeEditor
        caretStyleColor="white"
        caretClass="caret-white"
        backgroundClass="bg-slate-600"
        textColorClass="text-white"
      />
    </div>
  );
};

export default CodeEditorDemo;
