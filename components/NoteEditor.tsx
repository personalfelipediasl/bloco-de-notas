
import React, { useState, useEffect } from 'react';
import type { Note } from '../types';
import { IconButton } from './IconButton';
import { TrashIcon, SummarizeIcon, ImproveIcon, NotesIcon } from './Icons';

interface NoteEditorProps {
  activeNote: Note | undefined;
  onUpdateNote: (content: string) => void;
  onDeleteNote: (id: string) => void;
  onAiAction: (action: 'summarize' | 'improve', content: string) => void;
  isLoadingAi: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ activeNote, onUpdateNote, onDeleteNote, onAiAction, isLoadingAi }) => {
  const [content, setContent] = useState(activeNote?.content || '');

  useEffect(() => {
    setContent(activeNote?.content || '');
  }, [activeNote]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onUpdateNote(e.target.value);
  };
  
  if (!activeNote) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
        <NotesIcon className="w-24 h-24 mb-4 text-gray-700" />
        <h2 className="text-2xl font-bold">Selecione uma nota</h2>
        <p className="mt-2">Ou crie uma nova para começar.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex items-center justify-between p-3 border-b border-gray-700/50 bg-gray-800/30">
        <div className="text-sm text-gray-400">
          Última atualização: {new Date(activeNote.updatedAt).toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
            <IconButton 
                tooltip="Resumir com Gemini"
                onClick={() => onAiAction('summarize', content)} 
                disabled={isLoadingAi || !content.trim()}
                isLoading={isLoadingAi}
            >
                <SummarizeIcon className="w-5 h-5"/>
            </IconButton>
             <IconButton 
                tooltip="Melhorar com Gemini"
                onClick={() => onAiAction('improve', content)} 
                disabled={isLoadingAi || !content.trim()}
                isLoading={isLoadingAi}
            >
                <ImproveIcon className="w-5 h-5"/>
            </IconButton>
            <IconButton tooltip="Deletar Nota" onClick={() => onDeleteNote(activeNote.id)} variant="danger">
                <TrashIcon className="w-5 h-5" />
            </IconButton>
        </div>
      </div>
      <textarea
        value={content}
        onChange={handleContentChange}
        className="w-full h-full p-6 text-gray-200 bg-transparent resize-none focus:outline-none text-base leading-relaxed"
        placeholder="Comece a escrever..."
      />
    </div>
  );
};
