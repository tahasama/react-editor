import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import prettier from "prettier";

import "../screens/fullEditor.css";
import { useDispatch } from "react-redux";
import {
  getProjectData,
  updateCode,
  updateReactCode,
  updateSaved,
} from "../state";
import { useAppSelector } from "../state/hooks";
import parser from "prettier/parser-babel";

const ReactEditor = () => {
  const editorRef = useRef<any>(null);

  const dispatch = useDispatch();

  const { reactCode } = useAppSelector(getProjectData);

  const handleEditorChange = () => {
    dispatch(
      updateReactCode({ reactCode: editorRef.current.getValue() || "" })
    );
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const onFormat = () => {
    const formatted = prettier
      .format(editorRef.current.getValue(), {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="oneEditor">
      {/* <div className="header">
        <p className="title">React</p>
        <button onClick={onFormat} className="">
          format
        </button>
      </div> */}
      <span onClick={() => dispatch(updateSaved(false))}>
        <div className="resizableReactEditor">
          <Editor
            className="thaReactEditor"
            height="100%"
            defaultLanguage="javascript"
            value={reactCode}
            // defaultValue={js}
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
        </div>
      </span>
    </div>
  );
};

export default ReactEditor;
