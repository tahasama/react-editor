import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CssEditor from "../components/cssEditor";
import HtmlEditor from "../components/htmlEditor";
import JsEditor from "../components/jsEditor";

import "./fullEditor.css";
import SideBar from "../components/sideBar";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  cleanState,
  cloneProject,
  // cloneProject,
  deleteProject,
  fetchProject,
  getProjectData,
  projectInitialState,
  saveProject,
  updateSaved,
} from "../state/";

import TopBar from "../components/topBar";
import { getUserData } from "../state/reducers/userSlice";
import { AiOutlineWarning } from "react-icons/ai";

function FullEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    title,
    description,
    code: { html, css, js },
    updatedAt,
    saved,
  } = useAppSelector(getProjectData);
  const { email } = useAppSelector(getUserData);

  useEffect(() => {
    dispatch(fetchProject(id));

    window.onbeforeunload = function (e: any) {
      var e = e || window.event;
      if (e && !saved) {
        e.returnValue = "Any string";
      }
    };
    return () => {
      window.onbeforeunload = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved]);

  const handleUpdateTitle = () => {
    dispatch(
      saveProject({
        _id: id,
        title: title,
        description: description,
        code: { html: html, css: css, js: js },
      })
    );
    // dispatch(updateSaved(true));
    // setTimeout(() => {
    //   window.location.reload();
    // }, 200);
  };

  const handleClone = () => {
    console.log("let's clone");
    dispatch(
      cloneProject({
        user: email,
        title: title,
        description: description,
        code: { html: html, css: css, js: js },
      })
    );
  };

  const handleDeleteProject = async () => {
    const result = window.confirm("are you sure you want to delete ");
    if (result) {
      dispatch(deleteProject(id));
      dispatch(cleanState(projectInitialState));
      dispatch(updateSaved(true));
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
        clone={handleClone}
      />
      <div className="editorWrapper">
        <div className="titleContainer">
          {!email && (
            <p className="projectWarning">
              ! This work can't be saved, Log in and create/save your projects.
            </p>
          )}
          {id && (
            <>
              <h2 className="projectTitle">Project: {title} </h2>
              {email && (
                <p className="date ">
                  Updated on &#160;
                  {new Date(updatedAt).toLocaleDateString(navigator.language, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  &#160; at &#160;
                  {new Date(updatedAt).toLocaleTimeString(navigator.language, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              )}
            </>
          )}
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
          <iframe srcDoc={srcDoc} width="100%" title="codeFrame"></iframe>
        </div>
      </div>
    </div>
  );
}

export default FullEditor;
