"use client";
import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { IoCopyOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import styles from "./CodeBlock.module.css";

type CodeBlockProps = {
  value: string;
  onRemove: () => void;
  onChange: (content: string) => void;
};

const CodeBlock = ({
  value,
  onRemove,
  onChange,
}: CodeBlockProps) => {
  const [code, setCode] = useState(value || "");
  const [language, setLanguage] = useState<
    "javascript" | "python" | "java" | "cpp"
  >("javascript");
  const [copied, setCopied] = useState(false);

  // Keep local state in sync with parent value
  useEffect(() => {
    setCode(value || "");
  }, [value]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as "javascript" | "python" | "java" | "cpp");
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    setCopied(false);
    onChange(value); // Pass the updated code to the parent
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <div className={styles.container}>
      <button onClick={onRemove} className={styles.removeBtn}>
        ❌
      </button>
      <div className={styles.head}>
        <select
          onChange={handleLanguageChange}
          value={language}
          className={styles.selectLanguage}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button onClick={copyToClipboard} className={styles.copyButton}>
          {copied ? (
            <>
              <FaCheck /> Copied!
            </>
          ) : (
            <>
              <IoCopyOutline /> Copy
            </>
          )}
        </button>
      </div>
      <div className={styles.codeBlock}>
        <CodeMirror
          value={code}
          height="150px"
          theme="dark"
          extensions={[
            language === "javascript"
              ? javascript()
              : language === "python"
              ? python()
              : language === "java"
              ? java()
              : cpp(),
          ]}
          onChange={(value) => handleCodeChange(value)}
        />
      </div>
    </div>
  );
};

export default CodeBlock;