import React from "react";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import ThemeToggle from "./components/ThemeToggle";
import { EditorProvider } from "./context/EditorContext";
import "./styles/editor.css";

const App = () => {
  return (
    <EditorProvider>
      <div className="app-container">
        <ThemeToggle />
        <div className="editor-preview-container">
          <CodeEditor />
          <Preview />
        </div>
      </div>
    </EditorProvider>
  );
};

export default App;
