import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CssEditor from "../components/cssEditor";
import HtmlEditor from "../components/htmlEditor";
import JsEditor from "../components/jsEditor";

import "./fullEditor.css";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  deleteProject,
  fetchProject,
  getProjectData,
  saveProject,
  updateTitle,
} from "../state/";

import { AiFillEdit } from "react-icons/ai";
import { barState } from "../state/reducers/sideBarSlice";
import TopBar from "../components/topBar";

function FullEditor() {
  const [openInput, setOpenInput] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const titleRef = useRef<any>(null);
  const bar = useAppSelector((state) => state.bar);
  const {
    title,
    description,
    code: { html, css, js },
    updatedAt,
  } = useAppSelector(getProjectData);

  const handleGetProject = () => {
    dispatch(fetchProject(id));
  };

  useEffect(() => {
    handleGetProject();
  }, []);

  const handleUpdateTitle = () => {
    dispatch(
      saveProject({
        _id: id,
        title: title,
        description: description,
        code: { html: html, css: css, js: js },
      })
    );
    setOpenInput(false);
  };

  const handleDeleteProject = async () => {
    const result = window.confirm("are you sure you want to delete ");
    if (result) {
      dispatch(deleteProject(id));
      navigate("/");
    }
  };

  const srcDoc = `<html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script> 
                  </html>`;

  return (
    <div>
      <TopBar />
      <SideBar
        remove={handleDeleteProject}
        save={handleUpdateTitle}
        update={handleUpdateTitle}
      />
      <div className="editor-wrapper">
        <div className="titleContianer">
          <h2 className="projectTitle">Project : {title} </h2>
          <p className="date ">
            Updated on {new Date(updatedAt).toString().slice(0, 24)}
          </p>
        </div>

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
    </div>
  );
}

export default FullEditor;
