import React from "react";
import CssEditor from "./cssEditor";
import HtmlEditor from "./htmlEditor";
import JsEditor from "./jsEditor";

const ThreeEditors = () => {
  return (
    <div className="editors">
      <div className="editor">
        <HtmlEditor />
      </div>{" "}
      <div className="editor">
        <CssEditor />
      </div>{" "}
      <div className="editor">
        {" "}
        <JsEditor />
      </div>
    </div>
  );
};

export default ThreeEditors;
