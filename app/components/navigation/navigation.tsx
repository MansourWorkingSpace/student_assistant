import React from "react";

type Note = {
  id: string | null;
  title: string;
  content: any[];
};

type NavigationProps = {
  notes: Note[];
  selectedId: string | null;
  onSelectNote: (note: Note) => void;
};

const Navigation: React.FC<NavigationProps> = ({ notes, selectedId, onSelectNote }) => {
  const emptyNote: Note = {
    id: null,
    title: "",
    content: [],
  };

  const handleAddNote = () => {
    onSelectNote(emptyNote);
  };

  const handleClick = (note: Note) => {
    onSelectNote(note);
  };

  return (
    <aside style={{ width: 240, borderRight: "1px solid #ccc", padding: 16 }}>
      <h2>Your Notes</h2>
      <button onClick={handleAddNote} style={{ marginBottom: 12 }}>
        + Add New Note
      </button>
      <ul style={{ listStyle: "none", padding: 0}}>
        {notes.map((note) => (
          <li
            key={note.id || "new"}
            onClick={() => handleClick(note)}
            style={{
              cursor: "pointer",
              padding: 8,
              background: selectedId === note.id ? "#f0e6d2" : "transparent",
              marginBottom: 4,
            }}
          >
            {note.title || "Untitled"}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Navigation;
