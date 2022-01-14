import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import prettier from "prettier";
import cssParser from "prettier/parser-postcss";

import "../screens/fullEditor.css";
import {
  getProjectData,
  updateCode,
  updateSaved,
  // updateCss,
} from "../state/reducers/projectSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";

const CssEditor = () => {
  const editorRef = useRef<any>(null);

  const dispatch = useDispatch();

  const {
    code: { css },
  } = useAppSelector(getProjectData);

  const handleEditorChange = () => {
    dispatch(updateCode({ code: { css: editorRef.current.getValue() || "" } }));
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
      <span onClick={() => dispatch(updateSaved(false))}>
        <Editor
          height="45vh"
          defaultLanguage="css"
          value={css}
          // defaultValue={css}
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
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </span>
    </div>
  );
};

export default CssEditor;
