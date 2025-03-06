import React, { useContext } from "react";
import { Editor } from "@monaco-editor/react";
import { EditorContext } from "../context/EditorContext";

const CodeEditor = () => {
  const { code, setCode, language, setLanguage, theme } =
    useContext(EditorContext);

  return (
    <div className="code-editor-container">
      {/* Language Selection Dropdown */}
      <select
        className="language-select"
        onChange={(e) => setLanguage(e.target.value)}
        value={language}
      >
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
      </select>

      {/* Code Editor */}
      <Editor
        height="80vh"
        language={language}
        theme={theme}
        value={code}
        onChange={(newValue) => setCode(newValue)}
      />
    </div>
  );
};

export default CodeEditor;
