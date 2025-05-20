import { useState, useEffect } from "react";
import styles from "./ToggleBlock.module.css";

type ToggleBlockProps = {
  onRemove: () => void;
  onChange: (content: string) => void;
  value: string;
};

const ToggleBlock = ({ onRemove, onChange, value }: ToggleBlockProps) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<string>(value || "");

  useEffect(() => {
    setContent(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <button onClick={onRemove} className={styles.removeBtn}>❌</button>
      <div onClick={() => setOpen(!open)} className={styles.toggleLabel}>
        ▶ Toggle {open ? "▲" : "▼"}
      </div>
      {open && (
        <textarea
          className={styles.textarea}
          value={content}
          onChange={handleChange}
          placeholder="Type here..."
        />
      )}
    </div>
  );
};

export default ToggleBlock;
