"use client";

import React, { useState, useEffect } from "react";
import styles from "./paragraphBlock.module.css";

type ParagraphBlockProps = {
  value: string;
  onChange: (content: string) => void;
  onRemove: () => void;
};

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const [content, setContent] = useState(value || "");

  // Sync local state when prop value changes
  useEffect(() => {
    setContent(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        placeholder="Write your paragraph here..."
        value={content}
        onChange={handleChange}
      />
      <button className={styles.deleteButton} onClick={onRemove}>
        ❌
      </button>
    </div>
  );
};

export default ParagraphBlock;
