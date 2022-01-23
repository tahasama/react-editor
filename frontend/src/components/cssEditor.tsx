import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import prettier from "prettier";
import cssParser from "prettier/parser-postcss";

import "../screens/fullEditor.css";
import {
  getProjectData,
  updateCode,
  updateSaved,
} from "../state/reducers/projectSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import Resizable from "./resizable";
import { cssExample } from "../example";
import { getAuthData } from "../state/reducers/authSlice";

const CssEditor = () => {
  const editorRef = useRef<any>(null);
  const { uid } = useAppSelector(getAuthData);

  const dispatch = useDispatch();

  const { code } = useAppSelector(getProjectData);

  const handleEditorChange = () => {
    dispatch(updateCode({ code: { css: editorRef.current.getValue() || "" } }));
  };
  useEffect(() => {
    if (!uid) {
      dispatch(updateCode({ code: { css: cssExample } }));
      console.log();
    }
  }, []);
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
    <div className="oneEditor">
      <div className="header">
        <p className="title">Css</p>
        <button onClick={onFormat} className="format">
          format
        </button>
      </div>
      <span onClick={() => dispatch(updateSaved(false))}>
        <div className="resizableEditor">
          <Resizable direction={"horizontal"}>
            <Editor
              // className="thaEditor"
              height="100%"
              defaultLanguage="css"
              value={code?.css}
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
          </Resizable>
        </div>
      </span>
    </div>
  );
};

export default CssEditor;
