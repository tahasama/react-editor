import React, { useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import "../screens/fullEditor.css";

interface htmlProps {
  html: string;
  setHtml: any;
}

const HtmlEditor = ({ html, setHtml }: htmlProps) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = () => {
    setHtml(editorRef.current.getValue());
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div>
      <p className="title">HTML</p>
      <Editor
        height="45vh"
        defaultLanguage="html"
        defaultValue={html}
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

export default HtmlEditor;
