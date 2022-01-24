import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import prettier from "prettier";

import "../screens/fullEditor.css";
import { useDispatch } from "react-redux";
import {
  getProjectData,
  updateCellCode,
  updateCode,
  // updateReactCode,
  updateSaved,
} from "../state";
import { useAppSelector } from "../state/hooks";
import parser from "prettier/parser-babel";

const ReactEditor = ({ cell }: any) => {
  console.log("MY REACT CODE", cell.cellCode);
  const editorRef = useRef<any>(null);

  const dispatch = useDispatch();

  const { reactCode } = useAppSelector(getProjectData);

  const handleEditorChange = () => {
    dispatch(
      updateCellCode({
        cellId: cell.cellId,
        cellCode: editorRef.current.getValue() || "",
      })
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
      <button onClick={onFormat} className="abutton formatButton">
        format
      </button>
      <span onClick={() => dispatch(updateSaved(false))}>
        <div className="resizableReactEditor">
          <Editor
            className="thaReactEditor"
            height="100%"
            defaultLanguage="javascript"
            value={cell.cellCode}
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
