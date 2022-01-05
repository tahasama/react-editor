import React, { useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import prettier from "prettier";
import cssParser from "prettier/parser-postcss";

import "../screens/fullEditor.css";
import { updateCss } from "../state/reducers";
import { useDispatch } from "react-redux";

interface cssProps {
  css: string;
  setCss: any;
}

const CssEditor = () => {
  const editorRef = useRef<any>(null);

  const dispatch = useDispatch();
  const handleEditorChange = () => {
    dispatch(
      // updateCell({ myCode: editorRef.current.getValue(), myType: "css" })
      updateCss(editorRef.current.getValue())
    );
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const onFormat = () => {
    const formatted = prettier.format(editorRef.current.getValue(), {
      parser: "css",
      plugins: [cssParser],
    });
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <div className="header">
        <p className="title">Css</p>
        <button onClick={onFormat} className="format">
          format
        </button>
      </div>
      <Editor
        height="45vh"
        defaultLanguage="css"
        // value={css}
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
