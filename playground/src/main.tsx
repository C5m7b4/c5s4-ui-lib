import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';

import ToastDemo from './pages/ToastDemo/ToastDemo.tsx';
import TableDemo from './pages/tableDemo/TableDemo';
import JsonTreeViewDemo from './pages/JsonTreeViewDemo/index.tsx';
import PivotTableDemo from './pages/PivotTableDemo/PivotTableDemo.tsx';
import {
  FormItemsDemo,
  SelectDemo,
  InputDemo,
  RadioDemo,
  CheckboxDemo,
} from './pages/FormItems/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <TooltipProvider> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="toasts" element={<ToastDemo />} />
          <Route path="forms" element={<FormItemsDemo />}>
            <Route path="select" element={<SelectDemo />} />
            <Route path="input" element={<InputDemo />} />
            <Route path="checkbox" element={<CheckboxDemo />} />
            <Route path="radio" element={<RadioDemo />} />
          </Route>
          <Route path="table" element={<TableDemo />} />
          <Route path="json" element={<JsonTreeViewDemo />} />
          <Route path="pivot" element={<PivotTableDemo />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </TooltipProvider> */}
  </StrictMode>,
);
