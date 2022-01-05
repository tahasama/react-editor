import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import prettier from "prettier";
import htmlParser from "prettier/parser-html";

import "../screens/fullEditor.css";
import { useAppSelector } from "../state/hooks";
import { updateHtml } from "../state/reducers";
import { useDispatch } from "react-redux";

interface htmlProps {
  id: string | undefined;
}

const HtmlEditor = ({ id }: htmlProps) => {
  // const { code } = useAppSelector((state) => state.projs);

  const editorRef = useRef<any>(null);
  const dispatch = useDispatch();
  const handleEditorChange = () => {
    dispatch(
      // updateCell({ myCode: editorRef.current.getValue(), myType: "html" })
      updateHtml(editorRef.current.getValue())
    );
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const onFormat = () => {
    const formatted = prettier.format(editorRef.current.getValue(), {
      parser: "html",
      plugins: [htmlParser],
    });
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <div className="header">
        <p className="title">HTML</p>
        <button onClick={onFormat} className="format">
          format
        </button>
      </div>
      <Editor
        height="45vh"
        defaultLanguage="html"
        // value={code.html}
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
