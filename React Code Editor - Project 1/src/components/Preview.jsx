import React, { useContext, useEffect, useState } from "react";
import { EditorContext } from "../context/EditorContext";

const Preview = () => {
  const { code, language } = useContext(EditorContext);
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    if (
      language === "html" ||
      language === "css" ||
      language === "javascript"
    ) {
      const html = language === "html" ? code : "";
      const css = language === "css" ? `<style>${code}</style>` : "";
      const js = language === "javascript" ? `<script>${code}</script>` : "";

      setSrcDoc(`${html} ${css} ${js}`);
    }
  }, [code, language]);

  return (
    <div className="preview-container">
      {language === "html" ||
      language === "css" ||
      language === "javascript" ? (
        <iframe title="output" srcDoc={srcDoc} sandbox="allow-scripts" />
      ) : (
        <p>Live preview is available only for HTML, CSS, and JavaScript.</p>
      )}
    </div>
  );
};

export default Preview;
