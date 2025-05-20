"use client";

import React, { useState, useEffect, useRef } from "react";
import { CodeBlock } from "./codeBlock";
import { TableBlock } from "./TableBlock";
import { ToggleBlock } from "./ToggleBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import styles from "./NoteEditor.module.css";
import { useSession } from "next-auth/react";

export type BlockType = "paragraph" | "code" | "table" | "toggle";

export type Block = {
  id: string;
  type: BlockType;
  content?: string;
};

export type Note = {
  id: string | null;
  title: string;
  content: Block[];
};

type NoteEditorProps = {
  note: Note;
  onSave: () => void;
  onCancel: () => void;
};

const blockOptions = [
  { type: "paragraph" as BlockType, label: "Paragraph" },
  { type: "code" as BlockType, label: "Code Block" },
  { type: "table" as BlockType, label: "Table" },
  { type: "toggle" as BlockType, label: "Toggle" },
];

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
  const { data: session } = useSession();
  const [title, setTitle] = useState(note.title || "");
  const [blocks, setBlocks] = useState<Block[]>(
    note.content.length > 0
      ? note.content
      : [{ id: crypto.randomUUID(), type: "paragraph", content: "" }]
  );
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitle(note.title || "");
    setBlocks(
      note.content.length > 0
        ? note.content
        : [{ id: crypto.randomUUID(), type: "paragraph", content: "" }]
    );
  }, [note]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleSave = async () => {
    const noteTitle = title.trim() === "" ? "Untitled" : title;
    const userEmail = session?.user?.email;

    const res = await fetch(`/api/notes/${userEmail}`, {
      method: note.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: note.id, title: noteTitle, content: blocks }),
    });

    if (res.ok) {
      onSave();
    } else {
      alert("Failed to save note.");
    }
  };

  const insertBlockAtEnd = (type: BlockType) => {
    const newBlock: Block = { id: crypto.randomUUID(), type, content: "" };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    setShowMenu(false);
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className={styles.editorWrapper}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          className={styles.titleInput}
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div style={{ position: "relative" }}>
          <button
            className={styles.addBlockButton}
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Add block"
          >
            +
          </button>
          {showMenu && (
            <div
              ref={menuRef}
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: "4px 0",
                width: 150,
                zIndex: 1000,
              }}
            >
              {blockOptions.map((opt) => (
                <div
                  key={opt.type}
                  style={{ padding: "6px 12px", cursor: "pointer" }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    insertBlockAtEnd(opt.type);
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.editor}>
        {blocks.map((block) => {
          switch (block.type) {
            case "paragraph":
              return (
                <ParagraphBlock
                  key={block.id}
                  value={block.content || ""}
                  onChange={(content) => updateBlockContent(block.id, content)}
                  onRemove={() => removeBlock(block.id)}
                />
              );
            case "code":
              return (
                <CodeBlock
                  key={block.id}
                  value={block.content || ""}
                  onChange={(content) => updateBlockContent(block.id, content)}
                  onRemove={() => removeBlock(block.id)}
                />
              );
            case "table":
              return (
                <TableBlock
                  key={block.id}
                  value={block.content || ""}
                  onChange={(content) => updateBlockContent(block.id, content)}
                  onRemove={() => removeBlock(block.id)}
                />
              );
            case "toggle":
              return (
                <ToggleBlock
                  key={block.id}
                  value={block.content || ""}
                  onChange={(content) => updateBlockContent(block.id, content)}
                  onRemove={() => removeBlock(block.id)}
                />
              );
            default:
              return null;
          }
        })}
      </div>

      <button className={styles.saveButton} onClick={handleSave}>
        Save
      </button>
      <button className={styles.cancelButton} onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default NoteEditor;
