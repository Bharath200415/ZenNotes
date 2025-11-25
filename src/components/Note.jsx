import { Button } from "@/components/ui/button";
import Notesidebar from "./Notesidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import NoteView from "./Note-View";
import NoteEditor from "./NoteEditor";
import EmptyState from "./EmptyState";
import { saveNotes, loadNotes } from "../lib/storage";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  
    const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === null) return true; 
    return saved === "dark";
    });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Load saved notes on first render
  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  // Save notes whenever changed
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      createdAt: Date.now(),
    };
    setActiveNote(newNote);
    setNotes((prev) => [...prev, newNote]);
    setIsEditing(true);
  };

  const selectNote = (note) => {
    setActiveNote(note);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
      setIsEditing(false);
    }
  };

  const saveNote = (updatedNote) => {
    setNotes(
      notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      )
    );
    setActiveNote(updatedNote);
    setIsEditing(false);
  };

  const RenderNoteContent = () => {
    if (!activeNote && notes.length === 0) {
      return (
        <EmptyState
          message="Create your first note to get started"
          buttonText="New Note"
          onButtonClick={createNewNote}
        />
      );

    }

    if (activeNote && isEditing) {
      return (
        <NoteEditor
          note={activeNote}
          onSave={saveNote}
          onCancel={cancelEdit}
        />
      );

    }

    if (activeNote) {
      return (
        <NoteView
          note={activeNote}
          onEdit={() => setIsEditing(true)}
        />
      );
    }

    return <div>Hi there, welcome to your go-to notes app</div>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
    
      <Header
        onNewNote={createNewNote}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <div className="md:col-span-1">
          <Notesidebar
            onButtonClick={createNewNote}
            notes={notes}
            onSelectNote={selectNote}
            onDeleteNote={deleteNote}
            activeNoteId={activeNote?.id}
          />
        </div>

        <div className="md:col-span-2">
          <RenderNoteContent />
        </div>
      </main>
    </div>
  );
}
