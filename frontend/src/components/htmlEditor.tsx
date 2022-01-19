import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import prettier from "prettier";
import htmlParser from "prettier/parser-html";

import "../screens/fullEditor.css";
import {
  updateCode,
  getProjectData,
  updateSaved,
} from "../state/reducers/projectSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import Resizable from "./resizable";

const HtmlEditor = () => {
  const editorRef = useRef<any>(null);
  const dispatch = useDispatch();

  const {
    code: { html },
  } = useAppSelector(getProjectData);

  const handleEditorChange = () => {
    dispatch(
      updateCode({ code: { html: editorRef.current.getValue() || "" } })
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
    <div className="oneEditor">
      <div className="header">
        <p className="title">HTML</p>
        <button onClick={onFormat} className="format">
          format
        </button>
      </div>
      <span onClick={() => dispatch(updateSaved(false))}>
        <div className="resizableEditor">
          <Resizable direction={"horizontal"}>
            <Editor
              className="thaEditor"
              height="45vh"
              defaultLanguage="html"
              value={html}
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

export default HtmlEditor;
