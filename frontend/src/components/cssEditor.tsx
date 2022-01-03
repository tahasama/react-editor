import React, { useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import "../screens/fullEditor.css";

interface cssProps {
  css: string;
  setCss: any;
}

const CssEditor = ({ css, setCss }: cssProps) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = () => {
    setCss(editorRef.current.getValue());
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div>
      <p className="title">CSS</p>
      <Editor
        height="45vh"
        defaultLanguage="css"
        defaultValue={css}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        width="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CssEditor;
