
import React from 'react';
import type { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
}

const NoteListItem: React.FC<{ note: Note; isActive: boolean; onSelect: () => void; }> = ({ note, isActive, onSelect }) => {
  const contentSnippet = note.content.substring(0, 60) + (note.content.length > 60 ? '...' : '');

  return (
    <li
      onClick={onSelect}
      className={`
        cursor-pointer p-3 border-b border-gray-700/50 transition-colors
        ${isActive ? 'bg-blue-600/30' : 'hover:bg-gray-700/50'}
      `}
    >
      <h3 className="font-semibold text-gray-100 truncate">{note.title}</h3>
      <p className="text-sm text-gray-400 truncate mt-1">{contentSnippet || 'Nenhum conteúdo'}</p>
      <time className="text-xs text-gray-500 mt-2 block">
        {new Date(note.updatedAt).toLocaleString()}
      </time>
    </li>
  );
};


export const NoteList: React.FC<NoteListProps> = ({ notes, activeNoteId, onSelectNote }) => {
  if (notes.length === 0) {
    return <div className="p-4 text-center text-gray-500">Nenhuma nota ainda.</div>;
  }
  
  const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <ul>
      {sortedNotes.map(note => (
        <NoteListItem 
            key={note.id} 
            note={note} 
            isActive={note.id === activeNoteId}
            onSelect={() => onSelectNote(note.id)}
        />
      ))}
    </ul>
  );
};
