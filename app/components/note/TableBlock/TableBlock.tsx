import { useState, useEffect } from "react";
import styles from "./TableBlock.module.css";

type TableBlockProps = {
  value: string;
  onRemove: () => void;
  onChange: (content: string) => void;
};

const TableBlock = ({ value, onRemove, onChange }: TableBlockProps) => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [tableContent, setTableContent] = useState<string[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );

  useEffect(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          setTableContent(parsed);
          setRows(parsed.length);
          setCols(parsed[0]?.length || 2);
        }
      } catch {
        // ignore invalid JSON
      }
    }
  }, [value]);

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    cellValue: string
  ) => {
    const updatedContent = tableContent.map((row, r) =>
      row.map((cell, c) => (r === rowIndex && c === colIndex ? cellValue : cell))
    );
    setTableContent(updatedContent);
    onChange(JSON.stringify(updatedContent));
  };

  const addRow = () => {
    const newRow = Array(cols).fill("");
    const updated = [...tableContent, newRow];
    setTableContent(updated);
    setRows(updated.length);
    onChange(JSON.stringify(updated));
  };

  const removeRow = () => {
    if (rows <= 1) return;
    const updated = tableContent.slice(0, -1);
    setTableContent(updated);
    setRows(updated.length);
    onChange(JSON.stringify(updated));
  };

  const addCol = () => {
    const updated = tableContent.map((row) => [...row, ""]);
    setTableContent(updated);
    setCols(updated[0].length);
    onChange(JSON.stringify(updated));
  };

  const removeCol = () => {
    if (cols <= 1) return;
    const updated = tableContent.map((row) => row.slice(0, -1));
    setTableContent(updated);
    setCols(updated[0].length);
    onChange(JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <button onClick={onRemove} className={styles.removeBtn}>
        ❌
      </button>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <tbody>
            {tableContent.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex, colIndex, e.target.value)
                      }
                      className={styles.cell}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Column buttons container */}
        <div className={styles.colButtonsContainer}>
          <button onClick={addCol} disabled={false}>
            + Col
          </button>
          <button onClick={removeCol} disabled={cols <= 1}>
            - Col
          </button>
        </div>

        {/* Row buttons container */}
        <div className={styles.rowButtonsContainer}>
          <button onClick={addRow} disabled={false}>
            +Row
          </button>
          <button onClick={removeRow} disabled={rows <= 1}>
            -Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableBlock;
