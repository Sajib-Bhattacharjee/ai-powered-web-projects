import React, { createContext, useState } from "react";

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [code, setCode] = useState("<h1>Hello, World!</h1>"); // Default HTML
  const [language, setLanguage] = useState("html");
  const [theme, setTheme] = useState("vs-dark");

  return (
    <EditorContext.Provider
      value={{ code, setCode, language, setLanguage, theme, setTheme }}
    >
      {children}
    </EditorContext.Provider>
  );
};
