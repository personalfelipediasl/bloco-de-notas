
import React from 'react';
import { MenuIcon, NotesIcon } from './Icons';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="flex items-center justify-between p-3 bg-gray-800/50 border-b border-gray-700/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <NotesIcon className="w-7 h-7 text-blue-400" />
        <h1 className="text-xl font-bold text-gray-100">Gemini Notes</h1>
      </div>
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle sidebar"
      >
        <MenuIcon className="w-6 h-6" />
      </button>
    </header>
  );
};
