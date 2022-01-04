import React, { useEffect, useRef, useState } from "react";
import CssEditor from "./components/cssEditor";
import HtmlEditor from "./components/htmlEditor";
import JsEditor from "./components/jsEditor";
import FullEditor from "./screens/fullEditor";
import About from "./components/about";
import Home from "./screens/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectList from "./screens/projectList";
import CreateProject from "./screens/createProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/editor/:id" element={<FullEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
