
import React from 'react';
import type { Note } from '../types';
import { NoteList } from './NoteList';
import { PlusIcon } from './Icons';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ notes, activeNoteId, onSelectNote, onCreateNote, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`
          flex flex-col absolute md:static z-40 h-full
          bg-gray-800 border-r border-gray-700/50
          transition-transform duration-300 ease-in-out
          w-64 sm:w-72 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          flex-shrink-0
        `}
      >
        <div className="p-3 border-b border-gray-700/50">
          <button
            onClick={onCreateNote}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            <PlusIcon className="w-5 h-5" />
            Nova Nota
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NoteList
            notes={notes}
            activeNoteId={activeNoteId}
            onSelectNote={onSelectNote}
          />
        </div>
      </aside>
    </>
  );
};
