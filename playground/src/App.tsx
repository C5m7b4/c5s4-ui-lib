import { Button } from 'c5-tiny-package';
import { Select, Table } from '../../src';
import './App.css';
import '../../dist/index.css';
import { data, iData } from './data';
import { tableData, tableHeaders } from './data/tableData';
import { useToast } from '../../src';

function App() {
  const toast = useToast();

  const handleError = () => {
    toast.error('This  is an error message');
  };
  const handleSuccess = () => {
    toast.success('this is a success message');
  };
  const handleInfo = () => {
    toast.info('this is an info message');
  };
  const handleWarning = () => {
    toast.warn('this is a warning message');
  };

  return (
    <div>
      <Button />
      <Table data={tableData} headers={tableHeaders} />
      <div
        className="flex w-full justify-center gap-4"
        style={{ marginTop: '10px' }}
      >
        <button
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
      <Select<iData>
        data={data}
        displayKey={'name'}
        label={'Select type'}
        labelPosition="top"
        onSelect={(e: iData) => {
          console.log(e);
        }}
      />
    </div>
  );
}

export default App;
