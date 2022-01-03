import React, { useEffect, useRef, useState } from "react";
import CssEditor from "./components/cssEditor";
import HtmlEditor from "./components/htmlEditor";
import JsEditor from "./components/jsEditor";
import FullEditor from "./screens/fullEditor";

function App() {
  return (
    <div>
      <FullEditor />
    </div>
  );
}

export default App;
