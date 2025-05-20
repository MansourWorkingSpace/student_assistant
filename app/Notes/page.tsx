'use client'
import React, { useState, useEffect } from "react";
import {Navigation} from "../components/navigation";
import { NoteEditor } from "../components/note";

type Note = {
  id: string | null;
  title: string;
  content: any[];
};

const emptyNote: Note = {
  id: null,
  title: "",
  content: [],
};

const Page = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    const userEmail = "mansour.tech.contact@gmail.com"; // Replace with dynamic email if available
    const res = await fetch(`/api/notes/${userEmail}`);
    if (res.ok) {
      const data = await res.json();
      setNotes(data);
    } else {
      console.error("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async (note: Note) => {
    // You can include your POST or PUT logic here
    // After successful save:
    await fetchNotes();
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setSelectedNote(null);
  };

  return (
    <div style={{ display: "flex", height: "90vh" }}>
      <Navigation
        notes={notes}
        selectedId={selectedNote?.id || null}
        onSelectNote={setSelectedNote}
      />
      <main style={{ flex: 1, padding: 24 }}>
        {selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onSave={() => handleSave(selectedNote)}
            onCancel={handleCancel}
          />
        ) : (
          <p>Select a note or add a new one</p>
        )}
      </main>
    </div>
  );
};

export default Page;
