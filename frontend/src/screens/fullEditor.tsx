import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CssEditor from "../components/cssEditor";
import HtmlEditor from "../components/htmlEditor";
import JsEditor from "../components/jsEditor";

import "./fullEditor.css";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { fetchProject, getProjectData, saveProject } from "../state/reducers";

function FullEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    title,
    code: { html, css, js },
  } = useAppSelector(getProjectData);
  // const name = useAppSelector(getMyProjectTitle);

  const handleGetProject = () => {
    dispatch(fetchProject(id));
  };

  useEffect(() => {
    handleGetProject();
  }, []);

  const handleSaveProject = () => {
    const newData = {
      code: { html: html, css: css, js: js },
    };
    dispatch(saveProject({ newData, id }));
  };

  const handleDeleteProject = async () => {
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
        handleDeleteProjectClick={handleDeleteProject}
        save={handleSaveProject}
      />
      <h2 className="projectTitle">Project : {title}</h2>
      <div className="editors">
        <div className="editor">
          <HtmlEditor />
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
