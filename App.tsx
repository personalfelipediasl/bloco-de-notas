
import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Note } from './types';
import { Sidebar } from './components/Sidebar';
import { NoteEditor } from './components/NoteEditor';
import { Header } from './components/Header';
import { summarizeText, improveWriting } from './services/geminiService';
import { GeminiIcon } from './components/Icons';

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('gemini-notes', []);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const activeNote = useMemo(() => notes.find(note => note.id === activeNoteId), [notes, activeNoteId]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Nova Nota',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  };

  const handleUpdateNote = (updatedContent: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note => {
        if (note.id === activeNoteId) {
          const firstLine = updatedContent.split('\n')[0];
          return {
            ...note,
            title: firstLine.substring(0, 30) || 'Nova Nota',
            content: updatedContent,
            updatedAt: Date.now(),
          };
        }
        return note;
      })
    );
  };

  const handleDeleteNote = (idToDelete: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== idToDelete));
    if (activeNoteId === idToDelete) {
      setActiveNoteId(null);
    }
  };

  const handleSelectNote = (id: string) => {
    setActiveNoteId(id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };
  
  const handleAiAction = async (action: 'summarize' | 'improve', content: string) => {
      if (!content.trim()) return;

      setIsLoadingAi(true);
      try {
          const aiFunction = action === 'summarize' ? summarizeText : improveWriting;
          const result = await aiFunction(content);
          
          const enhancedContent = `${content}\n\n---\n**✨ Gemini ${action === 'summarize' ? 'Summary' : 'Improvement'}:**\n${result}`;
          handleUpdateNote(enhancedContent);

      } catch (error) {
          console.error(`Error during AI action: ${action}`, error);
          // Here you could set an error state and display it to the user
      } finally {
          setIsLoadingAi(false);
      }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className="flex flex-1 overflow-hidden">
        <Sidebar
          notes={notes}
          activeNoteId={activeNoteId}
          onSelectNote={handleSelectNote}
          onCreateNote={handleCreateNote}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <NoteEditor
          key={activeNote?.id}
          activeNote={activeNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          onAiAction={handleAiAction}
          isLoadingAi={isLoadingAi}
        />
      </main>
    </div>
  );
};

export default App;
