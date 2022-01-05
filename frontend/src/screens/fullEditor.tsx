import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CssEditor from "../components/cssEditor";
import HtmlEditor from "../components/htmlEditor";
import JsEditor from "../components/jsEditor";
import { AiOutlineSave } from "react-icons/ai";

import "./fullEditor.css";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { store } from "../state/store";
import { fetchProject, getMyProject } from "../state/reducers";

function FullEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const name = useAppSelector(getMyProject);
  const { html, css, js } = useAppSelector((state) => state.projs.code);
  console.log("dddddddddddddddd", html);
  console.log("selecttitle", name);
  // settitles(title);

  const handleGetProject = () => {
    dispatch(fetchProject(id));

    // setHtml(code.html);
    // setCss(code.css);
    // setJs(code.js);
  };

  useEffect(() => {
    handleGetProject();
  }, []);

  const handleSaveProject = async () => {
    const saveData = {
      code: {
        html: html,
        css: css,
        js: js,
      },
    };
    await axios.put("http://localhost:5000/api/project/" + id, saveData);
  };

  const handleDeleteProjectClick = async () => {
    const result = window.confirm("are you sure you want to delete ");
    if (result) {
      await axios.delete("http://localhost:5000/api/project/" + id);
      navigate("/");
    }
  };

  const srcDoc = `<html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script> 
                  </html>`;

  return (
    <div className="editor-wrapper">
      <SideBar
        handleSaveProject={handleSaveProject}
        handleDeleteProjectClick={handleDeleteProjectClick}
        id={id}
      />
      <h1>her you go : {name}</h1>
      <div className="editors">
        <div className="editor">
          <HtmlEditor id={id} />
        </div>
        <div className="editor">
          <CssEditor />
        </div>
        <div className="editor">
          <JsEditor />
        </div>
      </div>

      <div className="frame">
        <iframe srcDoc={srcDoc} width="100%"></iframe>
      </div>
    </div>
  );
}

export default FullEditor;
