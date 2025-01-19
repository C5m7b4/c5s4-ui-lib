import './App.css';
import '../../dist/index.css';
import FloatingControls from './components/FloatingControls';
import logo from './assets/c5s4logo.svg';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      const html = document.querySelector('html');
      html?.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {}, [theme]);
  return (
    <div className="bg-bkg text-content h-screen w-screen overflow-y-scroll no-scrollbar fill-content">
      <div className="w-full flex border-b justify-between pl-5">
        <img src={logo} alt="logo" width="60px" />
        <div className="flex items-center justify-center text-2xl font-medium b">
          Playground
        </div>
        <div></div>
      </div>
      <div className="w-full flex">
        <Sidebar />
        <div className="p-4  flex-1 justify-center align-center place-items-center  h-full">
          <Outlet />
        </div>
      </div>
      <FloatingControls defaultTheme={theme} />
    </div>
  );
}

export default App;
