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
  updateName,
  updateTitle,
} from "../state/";

import { AiFillEdit } from "react-icons/ai";
import { barState } from "../state/reducers/sideBarSlice";

function FullEditor() {
  const [openInput, setOpenInput] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const titleRef = useRef<any>(null);
  const bar = useAppSelector((state) => state.bar);

  const {
    title,
    code: { html, css, js },
  } = useAppSelector(getProjectData);

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

  const handleUpdateTitle = () => {
    console.log("maaaaaaaaaaaaaaaaaaa98765432", title);
    const newTitle = {
      title: title,
    };
    dispatch(updateName({ newTitle, id }));
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
    <div className="editor-wrapper">
      <SideBar
        remove={handleDeleteProject}
        save={handleSaveProject}
        // update={handleUpdateTitle}
      />
      <div className="titleContianer">
        <div className="updateContainer">
          {!openInput && (
            <button
              className="updateButton"
              onClick={() => setOpenInput(true)}
              onMouseEnter={() => dispatch(barState({ type: "edit" }))}
              onMouseLeave={() => dispatch(barState({ type: "Default" }))}
            >
              <AiFillEdit className="updateIcon" /> {bar.edit && "edit name ?"}
            </button>
          )}
          {openInput && (
            <div className="updateWrapper">
              <input
                className="updateInput"
                type="text"
                value={title}
                ref={titleRef}
                onChange={() => dispatch(updateTitle(titleRef.current.value))}
              />
              <button className="saveButton" onClick={handleUpdateTitle}>
                save
              </button>
            </div>
          )}
        </div>
        <h2 className="projectTitle">Project : {title}</h2>
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
  );
}

export default FullEditor;
