import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { EditorContext } from "../context/EditorContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(EditorContext);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
    >
      {theme === "vs-dark" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;
