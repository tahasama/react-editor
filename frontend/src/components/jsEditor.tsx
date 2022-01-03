import React, { useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import "../screens/fullEditor.css";

interface jsProps {
  js: string;
  setJs: any;
}

const JsEditor = ({ js, setJs }: jsProps) => {
  const editorRef = useRef<any>(null);

  const handleEditorChange = () => {
    setJs(editorRef.current.getValue());
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div>
      <p className="title">JS</p>
      <Editor
        height="45vh"
        defaultLanguage="javascriptx"
        defaultValue={js}
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

export default JsEditor;
