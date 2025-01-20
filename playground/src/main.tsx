import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';

import ToastDemo from './pages/ToastDemo/ToastDemo.tsx';
import FormItemsDemo from './pages/FormItemsDemo.tsx';
import TableDemo from './pages/TableDemo.tsx';
import JsonTreeViewDemo from './pages/JsonTreeViewDemo/index.tsx';
import PivotTableDemo from './pages/PivotTableDemo/PivotTableDemo.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <TooltipProvider> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="toasts" element={<ToastDemo />} />
          <Route path="forms" element={<FormItemsDemo />} />
          <Route path="table" element={<TableDemo />} />
          <Route path="json" element={<JsonTreeViewDemo />} />
          <Route path="pivot" element={<PivotTableDemo />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {/* </TooltipProvider> */}
  </StrictMode>,
);
