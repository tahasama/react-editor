import React, { useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import prettier from "prettier";
import jsParser from "prettier/parser-babel";

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

  const onFormat = () => {
    const formatted = prettier.format(editorRef.current.getValue(), {
      parser: "babel",
      plugins: [jsParser],
    });
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <div className="header">
        <p className="title">Js</p>
        <button onClick={onFormat} className="format">
          format
        </button>
      </div>
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
