import React, { useEffect, useRef, useState } from "react";
import CssEditor from "../components/cssEditor";
import HtmlEditor from "../components/htmlEditor";
import JsEditor from "../components/jsEditor";
import "./fullEditor.css";

function FullEditor() {
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");

  const srcDoc = `<html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>`;

  return (
    <div className="editor-wrapper">
      <div className="editors">
        <div className="editor">
          <HtmlEditor html={html} setHtml={setHtml} />
        </div>
        <div className="editor">
          <CssEditor css={css} setCss={setCss} />
        </div>
        <div className="editor">
          <JsEditor js={js} setJs={setJs} />
        </div>
      </div>
      <div className="frame">
        <iframe srcDoc={srcDoc} width="100%"></iframe>
      </div>
    </div>
  );
}

export default FullEditor;
